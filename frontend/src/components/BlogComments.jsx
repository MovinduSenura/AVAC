import { useState } from "react";
import { formatPostDate, isValidEmail, submitComment } from "../lib/publicApi";
import TestimonialAvatar from "./TestimonialAvatar";

const inputClassName =
  "mt-[8px] block w-full rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[12px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]";

function BlogComments({ postId, comments }) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const comment = data.get("comment").trim();
    setError("");
    setStatus("");

    if (!name || !email || !comment) {
      setError("Please enter your name, email and comment.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    try {
      await submitComment({ postId, name, email, comment });
      form.reset();
      setStatus("Thank you! Your comment will appear after it is approved.");
    } catch {
      setError("Could not send your comment. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="mt-[28px] max-w-[640px] border-t border-[#E3DBD8] pt-[24px]">
      <h3 className="text-[18px] font-bold tracking-[-0.02em] text-[color:var(--avac-gold)]">
        Comments ({String(comments.length).padStart(2, "0")})
      </h3>

      {comments.length > 0 && (
        <ul className="mt-[16px] space-y-[16px]">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-[12px]">
              <TestimonialAvatar name={comment.name} className="h-[40px] w-[40px]" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[color:var(--avac-gold)]">
                  {comment.name}
                  <span className="ml-[8px] text-[12px] font-normal text-[#727272]">
                    {formatPostDate(comment.created_at)}
                  </span>
                </p>
                <p className="mt-[4px] whitespace-pre-line break-words text-[13px] leading-[1.8] text-[#727272]">
                  {comment.comment}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Leave a comment"
        className="mt-[20px] rounded-[16px] bg-[#F1F5EB] px-[18px] py-[20px] sm:px-[24px]"
      >
        <fieldset disabled={isSending} className="min-w-0">
          <p className="text-[14px] font-semibold text-[color:var(--avac-gold)]">
            Leave a Comment
          </p>
          <div className="mt-[12px] grid gap-[14px] sm:grid-cols-2">
            <label className="block text-[13px] font-medium text-[color:var(--avac-gold)]">
              Name
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                className={inputClassName}
              />
            </label>
            <label className="block text-[13px] font-medium text-[color:var(--avac-gold)]">
              Email <span className="font-normal text-[#727272]">(not published)</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className={inputClassName}
              />
            </label>
          </div>
          <label className="mt-[14px] block text-[13px] font-medium text-[color:var(--avac-gold)]">
            Comment
            <textarea
              name="comment"
              rows={4}
              placeholder="Write your comment..."
              className={`${inputClassName} resize-y`}
            />
          </label>
          <button
            type="submit"
            className="mt-[16px] inline-flex h-[45px] cursor-pointer items-center justify-center rounded-full bg-[color:var(--avac-gold)] px-[24px] text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
          >
            {isSending ? "Sending..." : "Post Comment"}
          </button>
        </fieldset>
        <p role="alert" className="mt-[10px] text-[13px] text-red-700 empty:hidden">
          {error}
        </p>
        <p role="status" className="mt-[10px] text-[13px] text-[color:var(--avac-gold)] empty:hidden">
          {status}
        </p>
      </form>
    </div>
  );
}

export default BlogComments;
