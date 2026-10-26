"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
export default function Page() {
  const [message, setMessage] = useState("Confirming your sign-in…");
  useEffect(() => {
    async function confirm() {
      try {
        const client = getSupabase();
        if (!client) {
          setMessage("Supabase is not configured.");
          return;
        }
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
          const { error } = await client.auth.exchangeCodeForSession(code);
          if (error) {
            setMessage(error.message);
            return;
          }
          window.history.replaceState({}, "", "/auth/confirm");
        }
        const { data, error } = await client.auth.getUser();
        setMessage(
          error || !data.user
            ? "This link has expired or is invalid. Request a new sign-in link."
            : "You’re signed in. Your next adventure starts here.",
        );
      } catch {
        setMessage("Could not complete sign-in. Please try again.");
      }
    }
    void confirm();
  }, []);
  return (
    <main className="narrow">
      <h1>Welcome back.</h1>
      <p role="status" className="notice">
        {message}
      </p>
      <Link className="button" href="/trips/new">
        Plan a trip
      </Link>{" "}
      <Link href="/login">Return to sign in</Link>
    </main>
  );
}
