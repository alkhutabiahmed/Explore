import Link from "next/link";
export default function NotFound() {
  return (
    <main>
      <h1>A little off the map.</h1>
      <p className="muted">We couldn’t find that page.</p>
      <Link className="button" href="/">
        Back to exploring
      </Link>
    </main>
  );
}
