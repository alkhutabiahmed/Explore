import Link from "next/link";
export default function Page() {
  return (
    <main>
      <p className="eyebrow">Better together</p>
      <h1>
        Good company.
        <br />
        Great adventures.
      </h1>
      <p className="muted">
        A future home for travel connections, local guides, and invitations.
      </p>
      <section className="panel narrow">
        <h2>Your travel circle starts here</h2>
        <p className="muted">
          Community profiles, friend connections, and trip invitations are
          planned for an upcoming release. You can create an account and start
          planning your own trips now.
        </p>
        <Link className="button" href="/login">
          Create an account →
        </Link>
      </section>
    </main>
  );
}
