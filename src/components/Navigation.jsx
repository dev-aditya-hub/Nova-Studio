import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <Link href="/" className="logo">
        Nova Studio
      </Link>
      <nav>
        <Link href="/services">Services</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
