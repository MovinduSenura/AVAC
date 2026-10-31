import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../authContext";
import {
  Alert,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  LoadingState,
  PageHeader,
  Select,
  TableShell,
  Td,
  Th,
} from "../ui";
import { formatDate, getErrorMessage, useAdminQuery } from "../utils";

const SOURCE_LABELS = {
  newsletter: "Newsletter",
  preferred_countries: "Preferred countries",
};

async function loadSubscribers() {
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error) throw error;
  return data;
}

function SubscribersPage() {
  const { isAdmin } = useAuth();
  const { data: subscribers, error, loading, setData } = useAdminQuery(loadSubscribers, "subscribers");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState({ text: "", tone: "error" });

  const allCountries = [...new Set((subscribers ?? []).flatMap((row) => row.preferred_countries))].sort();
  const term = search.trim().toLowerCase();
  const visible = (subscribers ?? []).filter(
    (row) =>
      (!term || row.email.includes(term)) &&
      (!country || row.preferred_countries.includes(country)),
  );

  async function copyEmails() {
    try {
      await navigator.clipboard.writeText(visible.map((row) => row.email).join(", "));
      setMessage({ text: `Copied ${visible.length} email addresses.`, tone: "success" });
    } catch {
      setMessage({ text: "Could not copy. Please try again.", tone: "error" });
    }
  }

  async function remove(subscriber) {
    if (!window.confirm(`Remove ${subscriber.email} from the list?`)) return;
    const { error: deleteError } = await supabase.from("subscribers").delete().eq("id", subscriber.id);
    if (deleteError) {
      setMessage({ text: await getErrorMessage(deleteError), tone: "error" });
      return;
    }
    setData((current) => current.filter((row) => row.id !== subscriber.id));
  }

  return (
    <>
      <PageHeader
        title="Subscribers"
        description="People who joined the newsletter or chose their preferred countries on the Home page."
        actions={
          <Button variant="secondary" onClick={copyEmails} disabled={!visible.length}>
            Copy emails ({visible.length})
          </Button>
        }
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <Field label="Search">
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Email address" />
          </Field>
          <Field label="Preferred country">
            <Select value={country} onChange={(event) => setCountry(event.target.value)}>
              <option value="">All</option>
              {allCountries.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Card>

      <div className="mb-4 space-y-2">
        <Alert>{error}</Alert>
        <Alert tone={message.tone}>{message.text}</Alert>
      </div>

      <Card>
        {loading && !subscribers ? (
          <LoadingState />
        ) : !visible.length ? (
          <EmptyState title={subscribers?.length ? "No subscribers match" : "No subscribers yet"} />
        ) : (
          <TableShell>
            <thead>
              <tr>
                <Th>Email</Th>
                <Th>Preferred countries</Th>
                <Th>Signed up from</Th>
                <Th>Date</Th>
                {isAdmin && <Th className="text-right">Actions</Th>}
              </tr>
            </thead>
            <tbody>
              {visible.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-[#fcfbf8]">
                  <Td className="font-medium">{subscriber.email}</Td>
                  <Td className="text-[#5f5f5f]">{subscriber.preferred_countries.join(", ") || "-"}</Td>
                  <Td className="text-[#5f5f5f]">
                    {subscriber.sources.map((source) => SOURCE_LABELS[source] ?? source).join(", ")}
                  </Td>
                  <Td className="whitespace-nowrap text-[#5f5f5f]">{formatDate(subscriber.created_at)}</Td>
                  {isAdmin && (
                    <Td className="text-right">
                      <Button variant="danger" size="sm" onClick={() => remove(subscriber)}>
                        Remove
                      </Button>
                    </Td>
                  )}
                </tr>
              ))}
            </tbody>
          </TableShell>
        )}
      </Card>
    </>
  );
}

export default SubscribersPage;
