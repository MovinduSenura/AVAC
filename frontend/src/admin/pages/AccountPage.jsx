import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../authContext";
import { Alert, Button, Card, Field, Input, PageHeader, StatusBadge } from "../ui";
import { getErrorMessage } from "../utils";

function AccountPage() {
  const { profile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", tone: "error" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = data.get("password");

    if (password.length < 8) {
      setMessage({ text: "Password must be at least 8 characters.", tone: "error" });
      return;
    }
    if (password !== data.get("confirm")) {
      setMessage({ text: "The two passwords don't match.", tone: "error" });
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsSaving(false);
    if (error) {
      setMessage({ text: await getErrorMessage(error), tone: "error" });
      return;
    }
    form.reset();
    setMessage({ text: "Your password has been changed.", tone: "success" });
  }

  return (
    <>
      <PageHeader title="My account" />
      <div className="grid max-w-3xl gap-6 md:grid-cols-2">
        <Card className="space-y-3 p-5">
          <div>
            <p className="text-xs text-[#8a8a8a]">Name</p>
            <p className="font-medium">{profile.full_name || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-[#8a8a8a]">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-[#8a8a8a]">Role</p>
            <StatusBadge status={profile.role} />
          </div>
        </Card>

        <Card className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="font-semibold">Change password</p>
            <Alert tone={message.tone}>{message.text}</Alert>
            <Field label="New password">
              <Input name="password" type="password" autoComplete="new-password" required />
            </Field>
            <Field label="Confirm new password">
              <Input name="confirm" type="password" autoComplete="new-password" required />
            </Field>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Change password"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AccountPage;
