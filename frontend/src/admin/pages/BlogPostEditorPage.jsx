import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase, uploadImage, validateImage } from "../../lib/supabase";
import { useAuth } from "../authContext";
import { Alert, Button, Card, Field, Input, LoadingState, PageHeader, Select, Textarea } from "../ui";
import { getErrorMessage, useAdminQuery } from "../utils";

const newPost = {
  title: "",
  content: "",
  cover_image_url: "",
  category: "",
  tags: [],
  author_name: "admin",
  is_popular: false,
  status: "draft",
  published_at: null,
};

async function loadEditorData(postId) {
  const [post, categories] = await Promise.all([
    postId
      ? supabase.from("blog_posts").select("*").eq("id", postId).maybeSingle()
      : Promise.resolve({ data: newPost, error: null }),
    supabase.from("blog_posts").select("category"),
  ]);
  if (post.error) throw post.error;
  if (!post.data) throw new Error("This post no longer exists.");
  return {
    post: post.data,
    categories: [...new Set((categories.data ?? []).map((row) => row.category).filter(Boolean))],
  };
}

function PostForm({ initialPost, categories }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState({
    ...initialPost,
    tagsText: (initialPost.tags ?? []).join(", "),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const isNew = !initialPost.id;

  function update(name, value) {
    setPost((current) => ({ ...current, [name]: value }));
  }

  async function handleCoverChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const problem = validateImage(file, 5);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setIsUploading(true);
    try {
      update("cover_image_url", await uploadImage("blog-images", "posts", file));
    } catch (uploadError) {
      setError(await getErrorMessage(uploadError));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!post.title.trim()) {
      setError("Please enter a title.");
      return;
    }

    const record = {
      title: post.title.trim(),
      content: post.content.trim(),
      cover_image_url: post.cover_image_url || null,
      category: post.category.trim() || null,
      tags: [...new Set(post.tagsText.split(",").map((tag) => tag.trim()).filter(Boolean))],
      author_name: post.author_name.trim() || "admin",
      is_popular: post.is_popular,
      status: post.status,
      published_at:
        post.status === "published" ? post.published_at ?? new Date().toISOString() : post.published_at,
    };

    setIsSaving(true);
    setError("");
    const { error: saveError } = isNew
      ? await supabase.from("blog_posts").insert({ ...record, created_by: user.id })
      : await supabase.from("blog_posts").update(record).eq("id", initialPost.id);
    setIsSaving(false);

    if (saveError) {
      setError(await getErrorMessage(saveError));
      return;
    }
    navigate("/admin/blog");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <Alert>{error}</Alert>
        <Card className="space-y-4 p-5">
          <Field label="Title">
            <Input value={post.title} onChange={(event) => update("title", event.target.value)} />
          </Field>
          <Field label="Content" hint="Leave an empty line between paragraphs.">
            <Textarea
              rows={18}
              value={post.content}
              onChange={(event) => update("content", event.target.value)}
            />
          </Field>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="space-y-4 p-5">
          <Field label="Status">
            <Select value={post.status} onChange={(event) => update("status", event.target.value)}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published (visible on website)</option>
            </Select>
          </Field>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={post.is_popular}
              onChange={(event) => update("is_popular", event.target.checked)}
              className="h-4 w-4 accent-[#a77c2c]"
            />
            Show in “Popular Post”
          </label>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSaving || isUploading}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Link to="/admin/blog" className="flex-1">
              <span className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-[#e5ddd0] bg-white text-sm font-medium hover:bg-[#faf7f1]">
                Cancel
              </span>
            </Link>
          </div>
        </Card>

        <Card className="space-y-3 p-5">
          <p className="text-sm font-medium text-[#3d3d3d]">Cover image</p>
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-[#efe9de]">
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex h-8 cursor-pointer items-center rounded-lg border border-[#e5ddd0] bg-white px-3 text-xs font-medium hover:bg-[#faf7f1]">
              {isUploading ? "Uploading..." : post.cover_image_url ? "Change image" : "Upload image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleCoverChange}
                disabled={isUploading}
                className="sr-only"
              />
            </label>
            {post.cover_image_url && (
              <Button variant="ghost" size="sm" onClick={() => update("cover_image_url", "")}>
                Remove
              </Button>
            )}
          </div>
          <p className="text-xs text-[#8a8a8a]">JPG, PNG, WEBP or GIF, up to 5 MB.</p>
        </Card>

        <Card className="space-y-4 p-5">
          <Field label="Category">
            <Input
              list="blog-categories"
              value={post.category ?? ""}
              onChange={(event) => update("category", event.target.value)}
            />
            <datalist id="blog-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>
          <Field label="Tags" hint="Separate tags with commas.">
            <Input value={post.tagsText} onChange={(event) => update("tagsText", event.target.value)} />
          </Field>
          <Field label="Author name" hint="Shown as “By …” on the post.">
            <Input value={post.author_name} onChange={(event) => update("author_name", event.target.value)} />
          </Field>
        </Card>
      </div>
    </form>
  );
}

function BlogPostEditorPage() {
  const { postId } = useParams();
  const { data, error, loading } = useAdminQuery(() => loadEditorData(postId), postId ?? "new");

  return (
    <>
      <PageHeader title={postId ? "Edit post" : "New post"} />
      <Alert>{error}</Alert>
      {loading ? (
        <LoadingState />
      ) : (
        data && <PostForm key={postId ?? "new"} initialPost={data.post} categories={data.categories} />
      )}
    </>
  );
}

export default BlogPostEditorPage;
