"use client";

import { useState, useEffect } from "react";

function StatItem({ stat }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = stat.value;
    if (start === end) return;

    // figure out how fast to increment so the animation takes ~1.5 seconds
    const stepTime = Math.max(Math.floor(1500 / end), 10);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <div className="stat-item">
      <div className="stat-value">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Stats({ stats }) {
  return (
    <section className="stats-section" id="stats">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">
            Nova Studio in <span className="gradient-text">Numbers</span>
          </h2>
          <p className="section-subtitle">
            The milestones that define our journey and commitment to excellence.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
