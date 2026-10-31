import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  Alert,
  Button,
  Card,
  EmptyState,
  LoadingState,
  PageHeader,
  StatusBadge,
  TableShell,
  Td,
  Th,
} from "../ui";
import { formatDate, getErrorMessage, useAdminQuery } from "../utils";

async function loadPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, category, status, is_popular, published_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

function BlogPostsPage() {
  const navigate = useNavigate();
  const { data: posts, error, loading, setData } = useAdminQuery(loadPosts, "posts");
  const [actionError, setActionError] = useState("");

  async function remove(post) {
    if (!window.confirm(`Delete "${post.title}" and its comments? This cannot be undone.`)) return;
    setActionError("");
    const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (deleteError) {
      setActionError(await getErrorMessage(deleteError));
      return;
    }
    setData((current) => current.filter((row) => row.id !== post.id));
  }

  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Posts shown on the website's Blog page. Only published posts are visible to visitors."
        actions={<Button onClick={() => navigate("/admin/blog/new")}>New post</Button>}
      />

      <div className="mb-4 space-y-2">
        <Alert>{error}</Alert>
        <Alert>{actionError}</Alert>
      </div>

      <Card>
        {loading && !posts ? (
          <LoadingState />
        ) : !posts?.length ? (
          <EmptyState title="No posts yet" text="Click “New post” to write your first blog post." />
        ) : (
          <TableShell>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Published</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#fcfbf8]">
                  <Td>
                    <Link
                      to={`/admin/blog/${post.id}`}
                      className="font-medium hover:text-[color:var(--avac-gold)]"
                    >
                      {post.title}
                    </Link>
                    {post.is_popular && (
                      <span className="ml-2 text-xs text-[color:var(--avac-gold)]">★ Popular</span>
                    )}
                  </Td>
                  <Td className="text-[#5f5f5f]">{post.category || "-"}</Td>
                  <Td>
                    <StatusBadge status={post.status} />
                  </Td>
                  <Td className="whitespace-nowrap text-[#5f5f5f]">
                    {post.status === "published" ? formatDate(post.published_at) : "-"}
                  </Td>
                  <Td className="text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" size="sm" onClick={() => navigate(`/admin/blog/${post.id}`)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => remove(post)}>
                        Delete
                      </Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        )}
      </Card>
    </>
  );
}

export default BlogPostsPage;
