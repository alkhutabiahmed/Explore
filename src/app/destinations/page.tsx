import { Destinations } from "@/components/destinations";
export default function Page() {
  return (
    <main>
      <p className="eyebrow">Find your somewhere</p>
      <h1>Where will you go?</h1>
      <p className="muted">
        A small collection of places to inspire your next adventure.
      </p>
      <Destinations />
    </main>
  );
}
