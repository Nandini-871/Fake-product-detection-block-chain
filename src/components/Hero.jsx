//import QRGrid from "./QRGrid";
import Manufacturer from "./Manufacturer";
import { useState } from "react";

function Hero() {
  const [showModal, setShowModal] = useState(false);

  const qrPattern = [
    1,0,1,1,0,1,1,0,1,
    1,0,0,0,1,0,0,0,1,
    1,0,1,0,1,0,1,0,1,
    1,1,0,0,0,1,0,1,0,
    0,1,1,0,0,0,1,1,0,
    1,0,0,1,0,0,0,0,1,
    1,0,1,0,0,1,0,1,0,
    1,1,0,1,1,0,1,0,1,
    0,1,1,0,1,1,0,1,1
  ];

  return (
    <>
      <section className="hero">
        <h1>Verify Before You Trust</h1>

        <p>
          Ensure authenticity using blockchain technology. Verify before you buy.
        </p>

        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() =>
              document
                .querySelector(".scanner-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Scan Product
          </button>

          <button
            className="btn-outline"
            onClick={() => setShowModal(true)}
          >
            Manufacturer Login
          </button>
        </div>

        <div className="qr-visual">
          <div className="orbit-ring">
            <div className="orbit-dot"></div>
          </div>

          <div className="orbit-ring">
            <div className="orbit-dot"></div>
          </div>

          <div className="qr-frame">
            <div className="qr-corner tl"></div>
            <div className="qr-corner tr"></div>
            <div className="qr-corner bl"></div>
            <div className="qr-corner br"></div>
            <div className="scan-line"></div>

            <div className="qr-grid" id="qr-grid">
              {qrPattern.map((v, i) => (
                <div key={i} className={`qr-cell ${v ? "on" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {showModal && (
        <Manufacturer onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default Hero;