import Link from "next/link";
import { demoTrip as t } from "@/lib/demo";
export default function Page() {
  return (
    <main>
      <Link href="/trips" className="text-link">
        ← My trips
      </Link>
      <p className="eyebrow" style={{ marginTop: 28 }}>
        Sample trip · USD
      </p>
      <h1>{t.title}</h1>
      <p className="muted">
        {t.destination} · {t.dates}
      </p>
      <div className="stats">
        <div className="stat">
          <strong>${t.budget}</strong>Total budget
        </div>
        <div className="stat">
          <strong>${t.spent}</strong>Planned costs
        </div>
        <div className="stat">
          <strong>${t.budget - t.spent}</strong>Remaining
        </div>
      </div>
      <section className="panel">
        <h2>A little room for adventure</h2>
        <ol className="list">
          {[
            "Day 1 · Arrive, settle in, and stroll along the Kamo River",
            "Day 2 · Explore Fushimi Inari and the streets of Gion",
            "Day 3 · Arashiyama bamboo grove and a relaxed café afternoon",
          ].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
        <p className="muted">
          Illustrative itinerary and budget only. Detailed planning, shared
          expenses, and invitations will be added incrementally.
        </p>
        <Link className="button" href="/trips/new">
          Create your own trip
        </Link>
      </section>
    </main>
  );
}
