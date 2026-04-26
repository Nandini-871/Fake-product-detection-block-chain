import { useState, useRef, useEffect } from "react";

export default function Scanner() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");

  //  START CAMERA (FIXED)
  const startCamera = async () => {
    try {
      setError("");

      // stop previous stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      let stream;

      // try back camera first (mobile)
      try {
        stream = await navigator.mediaDevices.getUserMedia({
         video: { facingMode: "environment" },
          audio: false,
        });
      } catch {
        // fallback for laptop
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);
    } catch (err) {
      console.error(err);

      if (err.name === "NotAllowedError") {
        setError("Permission denied. Allow camera.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found.");
      } else if (err.name === "NotReadableError") {
        setError("Camera already in use.");
      } else {
        setError("Camera error: " + err.message);
      }

      setCameraOn(false);
    }
  };

  //  STOP CAMERA
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  };

  //  cleanup
  useEffect(() => {
    return () => stopCamera();
  }, []);

  //  VERIFY FROM BACKEND
  const verifyProduct = async () => {
    if (!hash) {
      alert("Enter product hash");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://fake-product-detection-block-chain-1.onrender.com/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash }),
      });

      const data = await res.json();

      if (data.status === "authentic") {
        setStatus("auth");
      } else {
        setStatus("fake");
      }
    } catch (err) {
      console.error(err);
      setError("Backend not connected");
    }

    setLoading(false);
  };

  //  TEMP SCAN
  const simulateScan = () => {
    setHash("0x4f8ae3b9c1d2e5f7a0b1c2d3e4f5");
  };

  return (
    <>
      <section className="scanner-section" id="scanner">
        <div className="section-inner">
          <div className="section-header">
            <h2>Verify <em>Any Product</em></h2>
          </div>

          <div className="scanner-card">
            <div>

              {/* CAMERA */}
              {!cameraOn ? (
                <div className="scan-area" onClick={startCamera}>
                  <div className="scan-text">Start Camera</div>
                  <div className="scan-sub">Click to scan QR</div>
                </div>
              ) : (
                <div>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="scan-area"
                  />

                  <button className="verify-btn" onClick={stopCamera}>
                    Stop Camera
                  </button>

                  <button className="verify-btn" onClick={simulateScan}>
                    Simulate Scan
                  </button>
                </div>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="or-divider">— OR —</div>

              <input
                className="hash-input"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="Enter product hash"
              />

              <button
                className={`verify-btn ${loading ? "loading" : ""}`}
                onClick={verifyProduct}
              >
                {loading ? "Verifying..." : "Verify Product"}
              </button>
            </div>

            {/* RESULT */}
            {status && (
              <div className="result-panel show">
                <div
                  className={`result-status ${
                    status === "auth" ? "authentic" : "fake"
                  }`}
                >
                  <div className="status-icon">
                    {status === "auth" ? "✓" : "✕"}
                  </div>

                  <div>
                    <div className="status-label">
                      {status === "auth"
                        ? "Authentic Product"
                        : "Fake Product"}
                    </div>
                    <div className="status-sub">
                      {status === "auth"
                        ? "Blockchain verified"
                        : "No record found"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
