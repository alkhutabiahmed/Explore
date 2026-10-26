import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations } from "@/lib/demo";
export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <main>
      <Link className="text-link" href="/destinations">
        ← Destinations
      </Link>
      <div
        className={`scene ${d.color}`}
        style={{ borderRadius: 20, margin: "24px 0" }}
        aria-hidden="true"
      >
        {d.emoji}
      </div>
      <p className="eyebrow">{d.category}</p>
      <h1>{d.name}</h1>
      <p className="muted">{d.description}</p>
      <Link
        className="button"
        href={`/trips/new?destination=${encodeURIComponent(d.name)}`}
      >
        Plan a trip here →
      </Link>
      <section className="panel">
        <h2>Find places for your itinerary</h2>
        <p className="muted">
          Explore current listings with external providers. Availability and
          prices are managed by those providers.
        </p>
        <ul className="list">
          {["Hotels", "Restaurants", "Activities", "Local guides"].map((x) => (
            <li key={x}>
              <a
                className="text-link"
                href={`https://www.google.com/maps/search/${encodeURIComponent(x + " in " + d.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore {x.toLowerCase()} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
