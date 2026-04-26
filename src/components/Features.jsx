import React from "react";

const features = [
  {
    icon: "🔗",
    title: "Immutable Blockchain",
    desc: "Powered by Ethereum smart contracts, ensuring that product records cannot be altered or tampered with.",
  },
  {
    icon: "⚡",
    title: "Instant Verification",
    desc: "Real-time blockchain queries provide results within seconds without delays or downtime.",
  },
  {
    icon: "🔐",
    title: "Secure QR Codes",
    desc: "Each product is linked to a unique cryptographic QR code that cannot be duplicated or forged.",
  },
  {
    icon: "📱",
    title: "No App Required",
    desc: "Simply scan using your device camera — no need to install any additional applications.",
  },
  {
    icon: "🏭",
    title: "Manufacturer Dashboard",
    desc: "Track and manage the complete product lifecycle from production to end consumer.",
  },
  {
    icon: "🌐",
    title: "Global Accessibility",
    desc: "Deployed on Ethereum mainnet, accessible worldwide across multiple regions and brands.",
  },
];

function Features() {
  return (
    <section className="features-section">
      <div className="section-header" style={{ textAlign: "center" }}>
        <div className="section-tag">// Technology</div>
        <h2>Why Choose <em>VerifyX</em></h2>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;