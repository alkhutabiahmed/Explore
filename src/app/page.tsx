import Link from "next/link";
import { Destinations } from "@/components/destinations";
export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">Go somewhere. Make memories.</div>
        <h1>
          Great journeys start
          <br />
          with good company.
        </h1>
        <p>
          Bring your travel dreams together. Find your next destination, plan
          the little details, and make it a trip to remember.
        </p>
        <Link className="button" href="/trips/new">
          Plan a trip <span>↗</span>
        </Link>
      </section>
      <div className="section-title">
        <div>
          <p className="eyebrow">Your next chapter</p>
          <h2>A world worth exploring</h2>
        </div>
        <Link className="text-link" href="/destinations">
          All destinations →
        </Link>
      </div>
      <Destinations />
      <section className="panel row">
        <div>
          <p className="eyebrow">Less juggling. More journey.</p>
          <h2>Every detail, in one place.</h2>
          <p className="muted">
            Your itinerary, budget, and favorite places — together at last.
          </p>
        </div>
        <Link className="button" href="/trips">
          See your trips →
        </Link>
      </section>
    </main>
  );
}
