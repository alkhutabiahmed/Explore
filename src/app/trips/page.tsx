import { SavedTrips } from "@/components/saved-trips";
import Link from "next/link";
import { demoTrip } from "@/lib/demo";
export default function Page() {
  return (
    <main>
      <div className="section-title">
        <div>
          <p className="eyebrow">Make it happen</p>
          <h1>Your travel plans</h1>
        </div>
        <Link className="button" href="/trips/new">
          + New trip
        </Link>
      </div>
      <SavedTrips />
      <p className="notice">
        You’re viewing a sample trip. Sign in and create a trip to start saving
        your own plans.
      </p>
      <Link
        className="card"
        style={{ display: "block", maxWidth: 500 }}
        href="/trips/demo"
      >
        <div className="scene" aria-hidden="true">
          ⛩️
        </div>
        <div className="card-body">
          <span className="tag">Sample trip</span>
          <h3>{demoTrip.title}</h3>
          <p>{demoTrip.destination}</p>
          <p className="muted">{demoTrip.dates}</p>
          <span className="text-link">Open sample itinerary →</span>
        </div>
      </Link>
    </main>
  );
}
