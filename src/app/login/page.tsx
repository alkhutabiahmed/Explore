"use client";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
export default function Page() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const client = getSupabase();
    if (!client) {
      setMessage(
        "Connect a Supabase project to enable sign in. See the README for setup instructions.",
      );
      return;
    }
    setBusy(true);
    try {
      const email = String(new FormData(e.currentTarget).get("email"));
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + "/auth/confirm" },
      });
      setMessage(
        error ? error.message : "Check your email for a secure sign-in link.",
      );
    } catch {
      setMessage("Unable to reach authentication. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="narrow">
      <p className="eyebrow">Your next adventure awaits</p>
      <h1>Welcome aboard.</h1>
      <p className="muted">
        Sign in or create an account with a secure email link.
      </p>
      <form className="panel" onSubmit={submit}>
        <label htmlFor="email">Email address</label>
        <input
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
        <button className="button" disabled={busy}>
          {busy ? "Sending…" : "Send sign-in link →"}
        </button>
        <p role="status" className="muted">
          {message}
        </p>
      </form>
    </main>
  );
}
