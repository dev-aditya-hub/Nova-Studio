"use client";

import { useState } from "react";
import { validateContactForm } from "@/lib/validators";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear the error for that field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate before sending to server
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || "Thank you! Message sent.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrorMsg(data.error || "Failed to submit.");
        }
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <h2 className="section-title">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind? Drop us a message and we will get back to you
          within 24 hours.
        </p>
      </div>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {successMsg && <div className="success-alert">{successMsg}</div>}
          {errorMsg && <div className="error-alert">{errorMsg}</div>}

          <div className="form-group">
            <label htmlFor="name-input">Your Name</label>
            <input
              id="name-input"
              name="name"
              type="text"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.name && <span className="form-error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email-input">Email Address</label>
            <input
              id="email-input"
              name="email"
              type="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.email && <span className="form-error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message-input">Your Message</label>
            <textarea
              id="message-input"
              name="message"
              className="form-input"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.message && <span className="form-error-msg">{errors.message}</span>}
          </div>

          <button
            id="contact-submit-button"
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
