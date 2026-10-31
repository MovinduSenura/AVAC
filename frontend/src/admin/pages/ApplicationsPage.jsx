import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../authContext";
import {
  Alert,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Field,
  Input,
  LoadingState,
  Modal,
  PageHeader,
  Pagination,
  Select,
  TableShell,
  Td,
  Textarea,
  Th,
} from "../ui";
import {
  APPLICATION_STATUSES,
  PAGE_SIZE,
  capitalize,
  cleanSearchTerm,
  formatDate,
  getErrorMessage,
  useAdminQuery,
} from "../utils";

const emptyFilters = { search: "", status: "", from: "", to: "" };

function nextDay(date) {
  const day = new Date(`${date}T00:00:00`);
  day.setDate(day.getDate() + 1);
  return day.toISOString();
}

async function loadApplications(filters, page) {
  let query = supabase
    .from("applications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const term = cleanSearchTerm(filters.search);
  if (term) {
    query = query.or(`full_name.ilike.%${term}%,email.ilike.%${term}%,phone.ilike.%${term}%`);
  }
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.from) query = query.gte("created_at", new Date(`${filters.from}T00:00:00`).toISOString());
  if (filters.to) query = query.lt("created_at", nextDay(filters.to));

  const { data, count, error } = await query;
  if (error) throw error;
  return { rows: data, count: count ?? 0 };
}

function whatsappLink(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

function DetailRow({ label, children }) {
  return (
    <div className="border-b border-[#f1ece3] py-3 last:border-0">
      <dt className="text-xs font-medium tracking-wide text-[#8a8a8a] uppercase">{label}</dt>
      <dd className="mt-1 text-sm break-words whitespace-pre-line text-[#1f1f1f]">{children || "-"}</dd>
    </div>
  );
}

function ApplicationDetails({ application, isAdmin, onClose, onChange, onDelete }) {
  const [notes, setNotes] = useState(application.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", tone: "error" });
  const whatsapp = whatsappLink(application.phone);

  async function save(changes) {
    setIsSaving(true);
    setMessage({ text: "", tone: "error" });
    const { error } = await supabase.from("applications").update(changes).eq("id", application.id);
    setIsSaving(false);
    if (error) {
      setMessage({ text: await getErrorMessage(error), tone: "error" });
      return;
    }
    onChange({ ...application, ...changes });
    setMessage({ text: "Saved.", tone: "success" });
  }

  async function remove() {
    if (!window.confirm(`Delete the application from ${application.full_name}? This cannot be undone.`)) return;
    const { error } = await supabase.from("applications").delete().eq("id", application.id);
    if (error) {
      setMessage({ text: await getErrorMessage(error), tone: "error" });
      return;
    }
    onDelete(application.id);
  }

  return (
    <Modal title={application.full_name} onClose={onClose}>
      <div className="space-y-5">
        <Alert tone={message.tone}>{message.text}</Alert>

        <Field label="Status">
          <Select
            value={application.status}
            disabled={isSaving}
            onChange={(event) => save({ status: event.target.value })}
          >
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {capitalize(status)}
              </option>
            ))}
          </Select>
        </Field>

        <div className="flex flex-wrap gap-2">
          <ButtonLink href={`mailto:${application.email}`}>Email</ButtonLink>
          <ButtonLink href={`tel:${application.phone}`}>Call</ButtonLink>
          {whatsapp && (
            <ButtonLink href={whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </ButtonLink>
          )}
        </div>

        <dl>
          <DetailRow label="Email">{application.email}</DetailRow>
          <DetailRow label="Phone">{application.phone}</DetailRow>
          <DetailRow label="Address">{application.address}</DetailRow>
          <DetailRow label="Passport number">{application.passport_number}</DetailRow>
          <DetailRow label="Passport expiry">
            {application.passport_expiry && formatDate(application.passport_expiry)}
          </DetailRow>
          <DetailRow label="Message">{application.message}</DetailRow>
          <DetailRow label="Received">
            {formatDate(application.created_at, true)}
            {application.source_page && ` (from the ${application.source_page} page)`}
          </DetailRow>
        </dl>

        <Field label="Internal notes" hint="Only visible to staff.">
          <Textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </Field>
        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={() => save({ notes: notes.trim() || null })}
            disabled={isSaving || notes === (application.notes ?? "")}
          >
            Save notes
          </Button>
          {isAdmin && (
            <Button variant="danger" onClick={remove}>
              Delete application
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

function ApplicationsPage() {
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState(emptyFilters);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [rowError, setRowError] = useState("");

  const { data, error, loading, setData } = useAdminQuery(
    () => loadApplications(filters, page),
    JSON.stringify({ filters, page }),
  );
  const rows = data?.rows ?? [];
  const selected = rows.find((row) => row.id === selectedId);
  const hasFilters = Object.values(filters).some(Boolean);

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  }

  function replaceRow(updated) {
    setData((current) => ({
      ...current,
      rows: current.rows.map((row) => (row.id === updated.id ? updated : row)),
    }));
  }

  async function changeStatus(application, status) {
    setRowError("");
    const { error: updateError } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", application.id);
    if (updateError) {
      setRowError(await getErrorMessage(updateError));
      return;
    }
    replaceRow({ ...application, status });
  }

  return (
    <>
      <PageHeader
        title="Applications"
        description="Job applications sent from the website's contact form."
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_160px_150px_150px_auto] md:items-end">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateFilter("search", searchInput);
            }}
            className="flex gap-2"
          >
            <Field label="Search" className="flex-1">
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Name, email or phone"
              />
            </Field>
            <Button type="submit" variant="secondary" className="self-end">
              Search
            </Button>
          </form>
          <Field label="Status">
            <Select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
              <option value="">All</option>
              {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {capitalize(status)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="From">
            <Input type="date" value={filters.from} onChange={(event) => updateFilter("from", event.target.value)} />
          </Field>
          <Field label="To">
            <Input type="date" value={filters.to} onChange={(event) => updateFilter("to", event.target.value)} />
          </Field>
          <Button
            variant="ghost"
            disabled={!hasFilters}
            onClick={() => {
              setFilters(emptyFilters);
              setSearchInput("");
              setPage(1);
            }}
          >
            Clear
          </Button>
        </div>
      </Card>

      <div className="mb-4 space-y-2">
        <Alert>{error}</Alert>
        <Alert>{rowError}</Alert>
      </div>

      <Card>
        {loading && !data ? (
          <LoadingState />
        ) : rows.length === 0 ? (
          <EmptyState
            title={hasFilters ? "No applications match these filters" : "No applications yet"}
            text={hasFilters ? "Try changing or clearing the filters." : "New applications will appear here."}
          />
        ) : (
          <div className={loading ? "opacity-60" : ""}>
            <TableShell>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Contact</Th>
                  <Th>Received</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Details</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((application) => (
                  <tr key={application.id} className="hover:bg-[#fcfbf8]">
                    <Td>
                      <button
                        type="button"
                        onClick={() => setSelectedId(application.id)}
                        className="cursor-pointer text-left font-medium hover:text-[color:var(--avac-gold)]"
                      >
                        {application.full_name}
                      </button>
                    </Td>
                    <Td>
                      <p>{application.email}</p>
                      <p className="text-xs text-[#8a8a8a]">{application.phone}</p>
                    </Td>
                    <Td className="whitespace-nowrap text-[#5f5f5f]">
                      {formatDate(application.created_at, true)}
                    </Td>
                    <Td>
                      <Select
                        aria-label={`Status for ${application.full_name}`}
                        value={application.status}
                        onChange={(event) => changeStatus(application, event.target.value)}
                        className="h-8 w-[130px] text-xs"
                      >
                        {APPLICATION_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {capitalize(status)}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td className="text-right">
                      <Button variant="secondary" size="sm" onClick={() => setSelectedId(application.id)}>
                        View
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
            <Pagination page={page} pageSize={PAGE_SIZE} total={data.count} onChange={setPage} />
          </div>
        )}
      </Card>

      {selected && (
        <ApplicationDetails
          key={selected.id}
          application={selected}
          isAdmin={isAdmin}
          onClose={() => setSelectedId(null)}
          onChange={replaceRow}
          onDelete={(id) => {
            setSelectedId(null);
            setData((current) => ({
              ...current,
              rows: current.rows.filter((row) => row.id !== id),
              count: current.count - 1,
            }));
          }}
        />
      )}
    </>
  );
}

export default ApplicationsPage;
