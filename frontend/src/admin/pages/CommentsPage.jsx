import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Alert, Button, Card, EmptyState, LoadingState, PageHeader, StatusBadge, Tabs } from "../ui";
import { capitalize, formatDate, getErrorMessage, useAdminQuery, REVIEW_STATUSES } from "../utils";

async function loadComments(status) {
  const { data, error } = await supabase
    .from("blog_comments")
    .select("id, name, email, comment, status, created_at, blog_posts(title)")
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return data;
}

function CommentsPage() {
  const [status, setStatus] = useState("pending");
  const { data: comments, error, loading, setData } = useAdminQuery(() => loadComments(status), status);
  const [actionError, setActionError] = useState("");

  async function setCommentStatus(comment, nextStatus) {
    setActionError("");
    const { error: updateError } = await supabase
      .from("blog_comments")
      .update({ status: nextStatus })
      .eq("id", comment.id);
    if (updateError) {
      setActionError(await getErrorMessage(updateError));
      return;
    }
    setData((current) => current.filter((row) => row.id !== comment.id));
  }

  async function remove(comment) {
    if (!window.confirm(`Delete this comment from ${comment.name}?`)) return;
    setActionError("");
    const { error: deleteError } = await supabase.from("blog_comments").delete().eq("id", comment.id);
    if (deleteError) {
      setActionError(await getErrorMessage(deleteError));
      return;
    }
    setData((current) => current.filter((row) => row.id !== comment.id));
  }

  return (
    <>
      <PageHeader
        title="Comments"
        description="Visitor comments on blog posts. Comments appear on the website only after you approve them."
      />
      <Tabs
        value={status}
        onChange={setStatus}
        tabs={REVIEW_STATUSES.map((value) => ({ value, label: capitalize(value) }))}
      />
      <div className="mb-4 space-y-2">
        <Alert>{error}</Alert>
        <Alert>{actionError}</Alert>
      </div>

      {loading ? (
        <Card>
          <LoadingState />
        </Card>
      ) : !comments?.length ? (
        <Card>
          <EmptyState title={`No ${status} comments`} />
        </Card>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium">
                    {comment.name}{" "}
                    <span className="text-sm font-normal text-[#8a8a8a]">{comment.email}</span>
                  </p>
                  <p className="text-xs text-[#8a8a8a]">
                    On “{comment.blog_posts?.title ?? "deleted post"}” · {formatDate(comment.created_at, true)}
                  </p>
                </div>
                <StatusBadge status={comment.status} />
              </div>
              <p className="mt-3 text-sm whitespace-pre-line break-words text-[#3d3d3d]">{comment.comment}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {comment.status !== "approved" && (
                  <Button variant="success" size="sm" onClick={() => setCommentStatus(comment, "approved")}>
                    Approve
                  </Button>
                )}
                {comment.status !== "rejected" && (
                  <Button variant="secondary" size="sm" onClick={() => setCommentStatus(comment, "rejected")}>
                    {comment.status === "approved" ? "Hide" : "Reject"}
                  </Button>
                )}
                <Button variant="danger" size="sm" onClick={() => remove(comment)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default CommentsPage;
