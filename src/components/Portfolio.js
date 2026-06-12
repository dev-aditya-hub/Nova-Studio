import Image from "next/image";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="project-overlay" />
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
      </div>
    </div>
  );
}

export default function Portfolio({ projects }) {
  return (
    <section className="section" id="portfolio">
      <div className="section-header">
        <h2 className="section-title">
          Our <span className="gradient-text">Work</span>
        </h2>
        <p className="section-subtitle">
          A selection of recent projects we have delivered for clients across
          various industries.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
