"use client";

import { useState } from "react";

export default function ContactMe() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
        website: e.target.website.value
      }),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      e.target.reset();
    } else {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="container">
      <h2>Contact Us</h2>
      <p>Send us a message and we will reply soon.</p>
      
      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "none" }} aria-hidden="true">
            <label>Leave this empty:</label>
            <input type="text" name="website" tabIndex="-1" autoComplete="off" />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
        {status && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{status}</p>}
      </div>
    </div>
  );
}
