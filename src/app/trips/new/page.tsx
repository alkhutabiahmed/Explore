"use client";
import { useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
export default function Page() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = new FormData(form);
    const start = String(values.get("start_date"));
    const end = String(values.get("end_date"));
    if (end < start) {
      setMessage("The end date must be on or after the start date.");
      return;
    }
    const client = getSupabase();
    if (!client) {
      setMessage(
        "Saving requires a connected Supabase project. Follow the README to configure it.",
      );
      return;
    }
    setBusy(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await client.auth.getUser();
      if (authError || !user) {
        setMessage("Please sign in before saving a trip.");
        return;
      }
      const { error } = await client
        .from("trips")
        .insert({
          owner_id: user.id,
          title: values.get("title"),
          destination: values.get("destination"),
          start_date: start,
          end_date: end,
          budget: Number(values.get("budget")),
          currency: values.get("currency"),
        });
      if (error) {
        setMessage(error.message);
        return;
      }
      setMessage("Your trip has been saved to your account.");
      form.reset();
    } catch {
      setMessage("Could not save your trip. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="narrow">
      <Link className="text-link" href="/trips">
        ← My trips
      </Link>
      <h1 style={{ marginTop: 24 }}>
        Start something
        <br />
        memorable.
      </h1>
      <p className="muted">Pick a place. Leave room for possibility.</p>
      <form className="panel" onSubmit={submit}>
        <label htmlFor="title">Trip name</label>
        <input
          id="title"
          name="title"
          maxLength={120}
          required
          placeholder="Our next great escape"
        />
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          name="destination"
          maxLength={200}
          required
          placeholder="Where are you dreaming of?"
        />
        <label htmlFor="start_date">Start date</label>
        <input type="date" id="start_date" name="start_date" required />
        <label htmlFor="end_date">End date</label>
        <input type="date" id="end_date" name="end_date" required />
        <label htmlFor="budget">Total budget</label>
        <input
          id="budget"
          name="budget"
          type="number"
          min="0"
          max="999999999"
          step="0.01"
          required
        />
        <label htmlFor="currency">Currency</label>
        <select id="currency" name="currency">
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
        </select>
        <button className="button" disabled={busy}>
          {busy ? "Saving…" : "Save trip →"}
        </button>
        <p role="status" className="muted">
          {message}
        </p>
        <Link className="text-link" href="/login">
          Sign in to save
        </Link>
      </form>
    </main>
  );
}
