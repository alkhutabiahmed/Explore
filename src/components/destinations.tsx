import Link from "next/link";
import { destinations } from "@/lib/demo";
export function Destinations() {
  return (
    <div className="grid">
      {destinations.map((d) => (
        <Link className="card" href={`/destinations/${d.slug}`} key={d.slug}>
          <div className={`scene ${d.color}`} aria-hidden="true">
            {d.emoji}
          </div>
          <div className="card-body">
            <span className="tag">{d.category}</span>
            <h3>{d.name}</h3>
            <p className="muted">{d.description}</p>
            <span className="text-link">Explore destination ↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
