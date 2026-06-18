"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateProject } from "@/lib/validators";

export default function DashboardClient({
  adminUser,
  initialContacts,
  initialProjects,
  initialAnalytics,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inquiries");
  
  const [contacts] = useState(initialContacts);
  const [projects, setProjects] = useState(initialProjects);
  const [analytics] = useState(initialAnalytics);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "Web Design",
    imageUrl: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "success" });

  const showFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "success" }), 4000);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      showFeedback("Logout failed", "error");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    const errors = validateProject(newProject);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      const data = await res.json();

      if (res.ok) {
        setProjects((prev) => [data, ...prev]);
        
        setNewProject({
          title: "",
          category: "Web Design",
          imageUrl: "",
          description: "",
        });
        showFeedback("Project added successfully!");
      } else {
        showFeedback(data.error || "Failed to add project", "error");
      }
    } catch (err) {
      showFeedback("Network error. Could not add project.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        showFeedback("Project deleted successfully!");
      } else {
        const data = await res.json();
        showFeedback(data.error || "Failed to delete project", "error");
      }
    } catch (err) {
      showFeedback("Network error. Could not delete project.", "error");
    }
  };

  const totalVisits = analytics.filter((e) => e.eventType === "page_visit").length;
  const totalClicks = analytics.filter((e) => e.eventType === "cta_click").length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Logged in as: <strong>{adminUser.username}</strong></p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <nav className="dashboard-tabs">
        <button
          className={activeTab === "inquiries" ? "active" : ""}
          onClick={() => setActiveTab("inquiries")}
        >
          Inquiries ({contacts.length})
        </button>
        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          Projects ({projects.length})
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Visitor Logs
        </button>
      </nav>

      {feedback.message && (
        <div className={`dashboard-feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <main className="dashboard-content">
        {activeTab === "inquiries" && (
          <div className="tab-pane">
            <h2>Client Project Inquiries</h2>
            {contacts.length === 0 ? (
              <p className="no-data">No inquiries received yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Message Inquiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>
                          {new Date(contact.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td><strong>{contact.name}</strong></td>
                        <td><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
                        <td>{contact.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="tab-pane">
            <div className="projects-manager-layout">
              <div className="form-column">
                <h3>Add New Project</h3>
                <form onSubmit={handleAddProject} className="admin-project-form">
                  <div className="form-group">
                    <label htmlFor="proj-title">Project Title</label>
                    <input
                      id="proj-title"
                      name="title"
                      type="text"
                      className="form-input"
                      value={newProject.title}
                      onChange={handleFormChange}
                      disabled={formLoading}
                      required
                    />
                    {formErrors.title && <span className="form-error-msg">{formErrors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="proj-cat">Category</label>
                    <select
                      id="proj-cat"
                      name="category"
                      className="form-input select-input"
                      value={newProject.category}
                      onChange={handleFormChange}
                      disabled={formLoading}
                    >
                      <option value="Web Design">Web Design</option>
                      <option value="Front-End Development">Front-End Development</option>
                      <option value="Branding">Branding</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="proj-img">Image Link</label>
                    <input
                      id="proj-img"
                      name="imageUrl"
                      type="text"
                      className="form-input"
                      placeholder="/images/project-1.jpg"
                      value={newProject.imageUrl}
                      onChange={handleFormChange}
                      disabled={formLoading}
                      required
                    />
                    {formErrors.imageUrl && <span className="form-error-msg">{formErrors.imageUrl}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="proj-desc">Description (Optional)</label>
                    <textarea
                      id="proj-desc"
                      name="description"
                      className="form-input"
                      rows="3"
                      value={newProject.description}
                      onChange={handleFormChange}
                      disabled={formLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-project-btn"
                    disabled={formLoading}
                  >
                    {formLoading ? "Adding..." : "+ Add Project"}
                  </button>
                </form>
              </div>

              <div className="list-column">
                <h3>Existing Portfolio Items</h3>
                {projects.length === 0 ? (
                  <p className="no-data">No projects available.</p>
                ) : (
                  <div className="project-admin-list">
                    {projects.map((project) => (
                      <div key={project.id} className="project-admin-card">
                        <div className="details">
                          <span className="cat-badge">{project.category}</span>
                          <h4>{project.title}</h4>
                          <p className="img-path">{project.imageUrl}</p>
                        </div>
                        <button
                          className="delete-project-btn"
                          onClick={() => handleDeleteProject(project.id)}
                          title="Delete Project"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="tab-pane">
            <h2>Site Visit & Click Stream Analytics</h2>

            <div className="analytics-metrics">
              <div className="metric-card">
                <h5>{totalVisits}</h5>
                <p>Page Visits</p>
              </div>
              <div className="metric-card secondary">
                <h5>{totalClicks}</h5>
                <p>Button Clicks</p>
              </div>
            </div>

            <h3>Recent Interactions Log (MongoDB)</h3>
            {analytics.length === 0 ? (
              <p className="no-data">No activities recorded yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="dashboard-table analytics-table">
                  <thead>
                    <tr>
                      <th>Time Logged</th>
                      <th>Action</th>
                      <th>Page Path</th>
                      <th>User Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.map((event) => (
                      <tr key={event.id || event._id}>
                        <td>{new Date(event.timestamp).toLocaleString()}</td>
                        <td>
                          <span className={`event-badge ${event.eventType}`}>
                            {event.eventType}
                          </span>
                        </td>
                        <td><code>{event.page}</code></td>
                        <td className="ua-cell" title={event.userAgent}>
                          {event.userAgent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
