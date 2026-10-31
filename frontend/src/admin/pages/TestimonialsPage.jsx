import { useState } from "react";
import { supabase, uploadImage, validateImage } from "../../lib/supabase";
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
  StatusBadge,
  Tabs,
  Textarea,
} from "../ui";
import { REVIEW_STATUSES, capitalize, formatDate, getErrorMessage, useAdminQuery } from "../utils";

const emptyTestimonial = { name: "", role: "", story: "", photo_url: "", status: "approved" };

async function loadTestimonials(status) {
  let query = supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (status !== "all") query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

function Avatar({ src, className = "h-12 w-12" }) {
  return (
    <img
      src={src || "/unknownProfile.jpg"}
      alt=""
      onError={(event) => {
        event.currentTarget.src = "/unknownProfile.jpg";
      }}
      className={`shrink-0 rounded-full bg-[#efe9de] object-cover ${className}`}
    />
  );
}

function TestimonialForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({ ...emptyTestimonial, ...initial });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const isNew = !initial.id;

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handlePhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const problem = validateImage(file, 2);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setIsUploading(true);
    try {
      update("photo_url", await uploadImage("testimonial-photos", "admin", file));
    } catch (uploadError) {
      setError(await getErrorMessage(uploadError));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.story.trim()) {
      setError("Please fill in the name, occupation and story.");
      return;
    }
    const record = {
      name: form.name.trim(),
      role: form.role.trim(),
      story: form.story.trim(),
      photo_url: form.photo_url || null,
      status: form.status,
    };
    setIsSaving(true);
    setError("");
    const { error: saveError } = isNew
      ? await supabase.from("testimonials").insert(record)
      : await supabase.from("testimonials").update(record).eq("id", initial.id);
    setIsSaving(false);
    if (saveError) {
      setError(await getErrorMessage(saveError));
      return;
    }
    onSaved();
  }

  return (
    <Modal title={isNew ? "Add testimonial" : "Edit testimonial"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Alert>{error}</Alert>
        <div className="flex items-center gap-4">
          <Avatar src={form.photo_url} className="h-16 w-16" />
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex h-8 cursor-pointer items-center rounded-lg border border-[#e5ddd0] bg-white px-3 text-xs font-medium hover:bg-[#faf7f1]">
              {isUploading ? "Uploading..." : "Upload photo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePhoto}
                disabled={isUploading}
                className="sr-only"
              />
            </label>
            {form.photo_url && (
              <Button variant="ghost" size="sm" onClick={() => update("photo_url", "")}>
                Remove
              </Button>
            )}
          </div>
        </div>
        <Field label="Name">
          <Input value={form.name} onChange={(event) => update("name", event.target.value)} />
        </Field>
        <Field label="Occupation">
          <Input value={form.role} onChange={(event) => update("role", event.target.value)} />
        </Field>
        <Field label="Story">
          <Textarea rows={7} value={form.story} onChange={(event) => update("story", event.target.value)} />
        </Field>
        <Field label="Status">
          <Select value={form.status} onChange={(event) => update("status", event.target.value)}>
            <option value="approved">Approved (visible on website)</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected (hidden)</option>
          </Select>
        </Field>
        <div className="flex gap-2">
          <Button type="submit" disabled={isSaving || isUploading}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function TestimonialsPage() {
  const [status, setStatus] = useState("pending");
  const { data: testimonials, error, loading, reload, setData } = useAdminQuery(
    () => loadTestimonials(status),
    status,
  );
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState("");

  async function setTestimonialStatus(testimonial, nextStatus) {
    setActionError("");
    const { error: updateError } = await supabase
      .from("testimonials")
      .update({ status: nextStatus })
      .eq("id", testimonial.id);
    if (updateError) {
      setActionError(await getErrorMessage(updateError));
      return;
    }
    setData((current) =>
      status === "all"
        ? current.map((row) => (row.id === testimonial.id ? { ...row, status: nextStatus } : row))
        : current.filter((row) => row.id !== testimonial.id),
    );
  }

  async function remove(testimonial) {
    if (!window.confirm(`Delete the testimonial from ${testimonial.name}?`)) return;
    setActionError("");
    const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", testimonial.id);
    if (deleteError) {
      setActionError(await getErrorMessage(deleteError));
      return;
    }
    setData((current) => current.filter((row) => row.id !== testimonial.id));
  }

  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Client reviews. Stories sent from the website wait here until you approve them."
        actions={<Button onClick={() => setEditing(emptyTestimonial)}>Add testimonial</Button>}
      />
      <Tabs
        value={status}
        onChange={setStatus}
        tabs={[
          ...REVIEW_STATUSES.map((value) => ({ value, label: capitalize(value) })),
          { value: "all", label: "All" },
        ]}
      />
      <div className="mb-4 space-y-2">
        <Alert>{error}</Alert>
        <Alert>{actionError}</Alert>
      </div>

      {loading ? (
        <Card>
          <LoadingState />
        </Card>
      ) : !testimonials?.length ? (
        <Card>
          <EmptyState title={status === "all" ? "No testimonials yet" : `No ${status} testimonials`} />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col p-5">
              <div className="flex items-start gap-3">
                <Avatar src={testimonial.photo_url} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-[#8a8a8a]">{testimonial.role}</p>
                </div>
                <StatusBadge status={testimonial.status} />
              </div>
              <p className="mt-3 flex-1 text-sm whitespace-pre-line break-words text-[#3d3d3d]">
                {testimonial.story}
              </p>
              <p className="mt-3 text-xs text-[#8a8a8a]">Received {formatDate(testimonial.created_at)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {testimonial.status !== "approved" && (
                  <Button variant="success" size="sm" onClick={() => setTestimonialStatus(testimonial, "approved")}>
                    Approve
                  </Button>
                )}
                {testimonial.status !== "rejected" && (
                  <Button variant="secondary" size="sm" onClick={() => setTestimonialStatus(testimonial, "rejected")}>
                    {testimonial.status === "approved" ? "Hide" : "Reject"}
                  </Button>
                )}
                <Button variant="secondary" size="sm" onClick={() => setEditing(testimonial)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => remove(testimonial)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <TestimonialForm
          key={editing.id ?? "new"}
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}
    </>
  );
}

export default TestimonialsPage;
