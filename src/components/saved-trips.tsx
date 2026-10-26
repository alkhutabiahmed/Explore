"use client";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
type Trip = {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  currency: string;
};
export function SavedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [status, setStatus] = useState("Loading your saved trips…");
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const client = getSupabase();
        if (!client) {
          if (active)
            setStatus("Connect Supabase to save and view your own trips.");
          return;
        }
        const {
          data: { user },
        } = await client.auth.getUser();
        if (!user) {
          if (active) setStatus("Sign in to view your saved trips.");
          return;
        }
        const { data, error } = await client
          .from("trips")
          .select("id,title,destination,start_date,end_date,budget,currency")
          .order("created_at", { ascending: false });
        if (active) {
          setTrips(data ?? []);
          setStatus(
            error
              ? error.message
              : data?.length
                ? ""
                : "No saved trips yet. Create your first adventure.",
          );
        }
      } catch {
        if (active)
          setStatus("Unable to load your trips. Please refresh to try again.");
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);
  return (
    <section className="panel">
      <h2>Your saved adventures</h2>
      <p role="status" className="muted">
        {status}
      </p>
      <ul className="list">
        {trips.map((t) => (
          <li key={t.id}>
            <h3>{t.title}</h3>
            <p>{t.destination}</p>
            <p className="muted">
              {t.start_date} → {t.end_date} · Budget: {t.currency}{" "}
              {Number(t.budget).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
