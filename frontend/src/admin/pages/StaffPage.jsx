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
  Modal,
  PageHeader,
  Select,
  TableShell,
  Td,
  Th,
} from "../ui";
import { formatDate, getErrorMessage, useAdminQuery } from "../utils";

const ROLE_HELP = {
  admin: "Admin: everything, including deleting applications and managing staff.",
  staff: "Staff: applications (view and change status), blog, comments, testimonials and subscribers.",
};

async function loadStaff() {
  const { data, error } = await supabase.from("profiles").select("*").order("created_at");
  if (error) throw error;
  return data;
}

async function callManageStaff(body) {
  const { error } = await supabase.functions.invoke("manage-staff", { body });
  if (error) throw new Error(await getErrorMessage(error));
}

function AddStaffForm({ onClose, onSaved }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setIsSaving(true);
    setError("");
    try {
      await callManageStaff({ action: "create", ...data });
      onSaved();
    } catch (saveError) {
      setError(saveError.message);
      setIsSaving(false);
    }
  }

  return (
    <Modal title="Add staff member" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Alert>{error}</Alert>
        <Field label="Full name">
          <Input name="full_name" required />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" required />
        </Field>
        <Field label="Temporary password" hint="At least 8 characters. They can change it from “My account”.">
          <Input name="password" type="text" minLength={8} required autoComplete="off" />
        </Field>
        <Field label="Role">
          <Select name="role" defaultValue="staff">
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </Select>
        </Field>
        <ul className="space-y-1 text-xs text-[#727272]">
          <li>{ROLE_HELP.admin}</li>
          <li>{ROLE_HELP.staff}</li>
        </ul>
        <div className="flex gap-2">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Adding..." : "Add staff member"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function StaffPage() {
  const { user } = useAuth();
  const { data: staff, error, loading, reload, setData } = useAdminQuery(loadStaff, "staff");
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState({ text: "", tone: "error" });

  async function changeRole(member, role) {
    setMessage({ text: "", tone: "error" });
    const { error: updateError } = await supabase.from("profiles").update({ role }).eq("id", member.id);
    if (updateError) {
      setMessage({ text: await getErrorMessage(updateError), tone: "error" });
      return;
    }
    setData((current) => current.map((row) => (row.id === member.id ? { ...row, role } : row)));
  }

  async function resetPassword(member) {
    const password = window.prompt(`New password for ${member.email} (at least 8 characters):`);
    if (!password) return;
    try {
      await callManageStaff({ action: "reset_password", user_id: member.id, password });
      setMessage({ text: `Password updated for ${member.email}.`, tone: "success" });
    } catch (resetError) {
      setMessage({ text: resetError.message, tone: "error" });
    }
  }

  async function remove(member) {
    if (!window.confirm(`Remove ${member.email}? They will no longer be able to sign in.`)) return;
    try {
      await callManageStaff({ action: "delete", user_id: member.id });
      setData((current) => current.filter((row) => row.id !== member.id));
    } catch (deleteError) {
      setMessage({ text: deleteError.message, tone: "error" });
    }
  }

  return (
    <>
      <PageHeader
        title="Staff"
        description="People who can sign in to this admin panel."
        actions={<Button onClick={() => setIsAdding(true)}>Add staff member</Button>}
      />
      <div className="mb-4 space-y-2">
        <Alert>{error}</Alert>
        <Alert tone={message.tone}>{message.text}</Alert>
      </div>

      <Card>
        {loading && !staff ? (
          <LoadingState />
        ) : !staff?.length ? (
          <EmptyState title="No staff yet" />
        ) : (
          <TableShell>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Added</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => {
                const isMe = member.id === user.id;
                return (
                  <tr key={member.id} className="hover:bg-[#fcfbf8]">
                    <Td>
                      <p className="font-medium">
                        {member.full_name || "-"} {isMe && <span className="text-xs text-[#8a8a8a]">(you)</span>}
                      </p>
                      <p className="text-xs text-[#8a8a8a]">{member.email}</p>
                    </Td>
                    <Td>
                      <Select
                        aria-label={`Role for ${member.email}`}
                        value={member.role}
                        disabled={isMe}
                        onChange={(event) => changeRole(member, event.target.value)}
                        className="h-8 w-[110px] text-xs"
                      >
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </Td>
                    <Td className="whitespace-nowrap text-[#5f5f5f]">{formatDate(member.created_at)}</Td>
                    <Td className="text-right">
                      {!isMe && (
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" size="sm" onClick={() => resetPassword(member)}>
                            Reset password
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => remove(member)}>
                            Remove
                          </Button>
                        </div>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </TableShell>
        )}
      </Card>

      {isAdding && (
        <AddStaffForm
          onClose={() => setIsAdding(false)}
          onSaved={() => {
            setIsAdding(false);
            setMessage({ text: "Staff member added. Share their email and temporary password with them.", tone: "success" });
            reload();
          }}
        />
      )}
    </>
  );
}

export default StaffPage;
