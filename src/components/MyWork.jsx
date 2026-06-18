"use client";

import { useState } from "react";

export default function MyWork({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="container">
      <h2>My Projects</h2>
      <p>Here is some of the work we have done recently.</p>

      <div className="filter-container" style={{ display: "flex", gap: "10px", margin: "25px 0", flexWrap: "wrap" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="btn"
            style={{
              backgroundColor: selectedCategory === category ? "var(--color-primary)" : "var(--color-surface)",
              color: selectedCategory === category ? "var(--color-surface)" : "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              padding: "8px 18px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card">
            <h3>{project.title}</h3>
            <span style={{ 
              display: "inline-block", 
              backgroundColor: "var(--color-border)", 
              color: "var(--color-text-muted)", 
              fontSize: "0.75rem", 
              fontWeight: "600", 
              padding: "3px 8px", 
              borderRadius: "12px", 
              marginBottom: "12px"
            }}>
              {project.category}
            </span>
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px", marginTop: "8px" }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

