import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "Explore Together",
  description:
    "Make room for your next adventure. Plan trips and explore together.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <Link className="brand" href="/">
            ✳ Explore Together
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/trips">My trips</Link>
            <Link href="/destinations">Discover</Link>
            <Link href="/community">Community</Link>
            <Link className="button small" href="/login">
              Sign in
            </Link>
          </nav>
        </header>
        {children}
        <footer>
          Explore Together · A little planning. A world of possibilities.
          <span>Made for the journey.</span>
        </footer>
      </body>
    </html>
  );
}
