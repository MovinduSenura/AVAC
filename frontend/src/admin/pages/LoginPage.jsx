import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { Alert, Button, Field, Input } from "../ui";

function LoginPage() {
  const { session, profile, loading, signIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  if (!loading && session && profile) return <Navigate to="/admin" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError("");
    setIsSigningIn(true);
    const { error: signInError } = await signIn(
      data.get("email").trim(),
      data.get("password"),
    );
    setIsSigningIn(false);
    if (signInError) setError("Incorrect email or password.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-4 text-[#1f1f1f]">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src="/favicon.svg" alt="" className="h-12 w-12 rounded-full object-cover" />
          <h1 className="mt-4 text-xl font-bold">AVA Consultants Admin</h1>
          <p className="mt-1 text-sm text-[#727272]">Sign in to manage the website</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-[#ece6db] bg-white p-6 shadow-sm"
        >
          <Alert>{error}</Alert>
          <Field label="Email">
            <Input name="email" type="email" autoComplete="email" required />
          </Field>
          <Field label="Password">
            <Input name="password" type="password" autoComplete="current-password" required />
          </Field>
          <Button type="submit" className="w-full" disabled={isSigningIn}>
            {isSigningIn ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-[#8a8a8a]">
          Forgot your password? Ask an admin to reset it.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
