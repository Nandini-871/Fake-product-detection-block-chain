function HowItWorks() {
  const steps = [
    { title: "Scan", desc: "Scan QR code from product" },
    { title: "Verify", desc: "Check data using blockchain" },
    { title: "Confirm", desc: "Get authenticity result" }
  ];

  return (
    <section className="how-section">
      <div className="section-header">
        <h2>How It Works</h2>
      </div>

      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={i} className="step-card">
            <div className="step-num">0{i + 1}</div>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;