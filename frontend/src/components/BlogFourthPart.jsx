import { useEffect, useRef, useState } from "react";
import TestimonialAvatar from "./TestimonialAvatar";

function BlogFourthPart({ onPost }) {
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const photoInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    setPhotoError("");

    if (file && !file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      event.target.value = "";
      setPhotoPreview("");
      return;
    }

    setPhotoPreview(file ? URL.createObjectURL(file) : "");
  }

  function removePhoto() {
    photoInputRef.current.value = "";
    setPhotoPreview("");
    setPhotoError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isPosting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const role = data.get("occupation").trim();
    const story = data.get("successStory").trim();
    setPostError("");
    setPostStatus("");

    if (!name || !role || !story) {
      setPostError("Please enter your name, occupation, and success story.");
      return;
    }

    setIsPosting(true);
    try {
      const file = data.get("profilePhoto");
      let photo = "";

      if (file?.size) {
        photo = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Photo could not be read"));
          reader.onabort = () => reject(new Error("Photo reading was cancelled"));
          reader.readAsDataURL(file);
        });
      }

      onPost({ name, role, story, photo });
      form.reset();
      setPhotoPreview("");
      setPhotoError("");
      setPostStatus("Your testimonial has been added.");
    } catch {
      setPostError("Could not add your testimonial. Please try again.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <section
      aria-labelledby="success-story-heading"
      className="bg-white px-4 pb-[74px] text-black sm:px-8 sm:pb-[48px]"
    >
      <form
        onSubmit={handleSubmit}
        aria-labelledby="success-story-heading"
        className="mx-auto max-w-[1000px] rounded-[20px] bg-[#F1F5EB] px-[22px] py-[32px] sm:px-[42px] sm:pb-[24px] sm:pt-[42px]"
      >
        <fieldset disabled={isPosting} className="min-w-0">
          <div className="flex items-center gap-[10px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--avac-gold)]">
              Share your testimonial
            </p>
            <img
              src="/paperRocket.svg"
              alt=""
              className="h-[12px] w-[18px] object-contain"
            />
          </div>
          <h2
            id="success-story-heading"
            className="mt-[12px] text-[34px] font-bold leading-[1.15] text-[color:var(--avac-gold)]"
          >
            What Is Your Success Story?
          </h2>
          <p
            id="success-story-description"
            className="mt-[14px] text-[14px] leading-[1.8] text-[#727272]"
          >
            Tell us about your experience with AVA Consultants and the milestones
            you have achieved.
          </p>
          <div className="mt-[24px] grid gap-[18px] sm:grid-cols-2">
            <div>
              <label
                htmlFor="testimonial-name"
                className="block text-[14px] font-medium text-[color:var(--avac-gold)]"
              >
                Name
              </label>
              <input
                id="testimonial-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your name"
                className="mt-[8px] block w-full rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[14px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]"
              />
            </div>
            <div>
              <label
                htmlFor="testimonial-occupation"
                className="block text-[14px] font-medium text-[color:var(--avac-gold)]"
              >
                Occupation
              </label>
              <input
                id="testimonial-occupation"
                name="occupation"
                type="text"
                required
                autoComplete="organization-title"
                placeholder="Enter your occupation"
                className="mt-[8px] block w-full rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[14px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]"
              />
            </div>
          </div>
          <div className="mt-[24px]">
            <label
              htmlFor="testimonial-photo"
              className="block text-[14px] font-medium text-[color:var(--avac-gold)]"
            >
              Profile Photo <span className="font-normal">(optional)</span>
            </label>
            <div className="mt-[12px] flex flex-col gap-[16px] sm:flex-row sm:items-start">
              <TestimonialAvatar
                src={photoPreview}
                className="h-[64px] w-[64px]"
              />
              <div className="min-w-0 flex-1">
                <input
                  ref={photoInputRef}
                  id="testimonial-photo"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  aria-describedby="testimonial-photo-error"
                  aria-invalid={Boolean(photoError)}
                  className="block w-full min-w-0 cursor-pointer rounded-[14px] border border-[#E3DBD8] bg-white p-[12px] text-[12px] text-[#727272] file:mr-[12px] file:cursor-pointer file:rounded-full file:border-0 file:bg-[color:var(--avac-gold)] file:px-[16px] file:py-[8px] file:text-[12px] file:font-medium file:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--avac-gold)]"
                />
                {/* <p
                  id="testimonial-photo-help"
                  className="mt-[8px] text-[12px] leading-[1.8] text-[#727272]"
                >
                  Add a photo of yourself, or leave this blank to use the default
                  profile picture.
                </p> */}
                <p
                  id="testimonial-photo-error"
                  role="alert"
                  className="text-[12px] text-red-700"
                >
                  {photoError}
                </p>
                {photoPreview && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="mt-[8px] cursor-pointer text-[12px] font-medium text-[color:var(--avac-gold)] underline underline-offset-4"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <textarea
            id="success-story"
            name="successStory"
            required
            aria-labelledby="success-story-heading"
            aria-describedby="success-story-description"
            rows={6}
            placeholder="Share your success story here..."
            className="mt-[24px] block min-h-[180px] w-full resize-y rounded-[14px] border border-[#E3DBD8] bg-white px-[18px] py-[16px] text-[14px] leading-[1.8] text-black placeholder:text-[#727272] focus:border-[color:var(--avac-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--avac-gold)]"
          />
          <button
            type="submit"
            className="mt-[20px] inline-flex min-h-[45px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-full bg-[color:var(--avac-gold)] px-[28px] py-[12px] text-[14px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--avac-gold)] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            <span>{isPosting ? "Posting..." : "Post"}</span>
            {/* <img
              src="/smallArrow.png"
              alt=""
              aria-hidden="true"
              className="h-[9px] w-[10px] object-contain"
            /> */}
          </button>
        </fieldset>
        <p role="alert" className="mt-[12px] text-[14px] text-red-700 sm:empty:mt-0">
          {postError}
        </p>
        <p role="status" className="text-[14px] text-[color:var(--avac-gold)]">
          {postStatus}
        </p>
      </form>
    </section>
  );
}

export default BlogFourthPart;
