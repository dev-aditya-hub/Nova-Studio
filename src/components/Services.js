"use client";

// simple map to associate service names with an emoji icon
const iconMap = {
  DesignServices: "🎨",
  Code: "💻",
  Brush: "✏️",
};

function ServiceCard({ service }) {
  // default to star if icon isn't found
  const icon = iconMap[service.icon] || "⭐";

  return (
    <div className="service-card">
      <div className="service-icon-wrapper">{icon}</div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}

export default function Services({ services }) {
  return (
    <section className="section" id="services">
      <div className="section-header">
        <h2 className="section-title">
          What We <span className="gradient-text">Do</span>
        </h2>
        <p className="section-subtitle">
          We offer end-to-end digital solutions to bring your vision to life,
          from initial concept through to polished execution.
        </p>
      </div>

      <div className="services-grid">
        {/* render a card for each service fetched from db */}
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
