import React, { useEffect, useState } from "react";

function Blockchain() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/blocks")
      .then((res) => res.json())
      .then((data) => setBlocks(data.blocks))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="blockchain-section" id="blockchain">
      <div className="section-inner">
        <div
          className="section-header"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <div className="section-tag">// Live Ledger</div>
          <h2>
            Recent <em>Block Activity</em>
          </h2>
        </div>

        <div className="blocks-row">
          {blocks.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="chain-connector">→</div>}

              <div
                className={`block-item ${
                  b.index === 0 ? "genesis" : ""
                } ${i === 0 ? "latest" : ""}`}
              >
                <div className="block-label">
                  {b.index === 0
                    ? "Genesis"
                    : i === 0
                    ? "Latest"
                    : `Block #${b.index}`}
                </div>

                <div className="block-hash">
                  {b.hash?.slice(0, 10)}...
                </div>

                <div className="block-data">
                  {b.product_details?.name || "Unknown Product"}
                  <br />
                  <span style={{ opacity: 0.5 }}>
                    {new Date(b.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blockchain;