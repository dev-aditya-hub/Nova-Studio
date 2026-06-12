"use client";

export default function Hero() {
  const handleCtaClick = async () => {
    // scroll smoothly to the contact form section when button is clicked
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // also log this click in our analytics
    try {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "cta_click",
          page: "/",
          metadata: { buttonId: "hero-cta" },
        }),
      });
    } catch (err) {
      // fail silently so it doesn't break the user experience
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <span className="hero-badge">Nova Studio — Digital Agency</span>

        <h1 className="hero-title">
          We Build <span className="gradient-text">Digital Experiences</span>
        </h1>

        <p className="hero-subtitle">
          We are a creative studio focused on web design, development, and
          branding. We help businesses stand out with thoughtful digital
          solutions.
        </p>

        <button
          id="hero-cta-button"
          className="btn-primary"
          onClick={handleCtaClick}
        >
          Start a Project &rarr;
        </button>
      </div>
    </section>
  );
}
