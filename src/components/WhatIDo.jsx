export default function WhatIDo({ services }) {
  return (
    <div className="container">
      <h2>What We Do</h2>
      <p>Here are the services we offer.</p>
      
      <div className="grid">
        {services.map((service) => (
          <div key={service.id} className="card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
