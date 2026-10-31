import { useState } from "react";
import { isValidEmail, submitApplication } from "./publicApi";

export function useApplicationForm(sourcePage) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setError("");
    setSuccess("");

    if (!fields.fullName?.trim() || !fields.email?.trim() || !fields.phone?.trim()) {
      setError("Please enter your name, email and phone number.");
      return;
    }
    if (!isValidEmail(fields.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    try {
      await submitApplication(fields, sourcePage);
      form.reset();
      setSuccess("Thank you! Your message has been sent. We will contact you soon.");
    } catch {
      setError("Sorry, your message could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return { handleSubmit, isSending, error, success };
}
