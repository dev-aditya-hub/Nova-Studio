import Link from "next/link";

export default function Welcome() {
  return (
    <section className="hero-section">
      <span className="hero-title animate-fade-in-up delay-1">Nova Studio</span>
      <h1 className="hero-heading animate-fade-in-up delay-2">
        We Design & Build Next-Gen Digital Products
      </h1>
      <p className="hero-subheading animate-fade-in-up delay-3">
        A creative agency dedicated to transforming your vision into clean,
        performant, and premium web experiences.
      </p>
      <Link href="/contact" className="btn hero-cta animate-fade-in-up delay-4">
        Start a Project
      </Link>
    </section>
  );
}

