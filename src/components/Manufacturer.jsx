import { useState, useEffect } from "react";

export default function Manufacturer({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    secret: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      //  SAFE RESULT CHECK
      if (data && data.product_hash) {
        setResult(data);
      } else {
        setResult(null);
        alert("Invalid response from backend");
      }

    } catch (err) {
      alert("Error connecting backend");
    }

    setLoading(false);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}
      >
        <div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#111",
            padding: "25px",
            borderRadius: "10px",
            width: "380px",
            maxWidth: "90%",
            color: "#fff",
            position: "relative",
            zIndex: 10000
          }}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "12px",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>

          <h2 style={{ marginBottom: "15px" }}>Register Product</h2>

          {/* FORM / RESULT SWITCH */}
         {result && result.product_hash ? (
  <div style={{ textAlign: "center" }}>
    <p> Product Registered</p>
    <p>Hash: {result.product_hash.slice(0, 10)}...</p>

    {/*  FIX HERE */}
    {result.qr_code && (
      <img
        src={`data:image/png;base64,${result.qr_code}`}
        alt="QR"
        style={{ width: "150px", marginTop: "10px" }}
      />
    )}
  </div>
) : (
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
                style={inputStyle}
              />

              <input
                placeholder="Brand"
                value={form.brand}
                onChange={(e) =>
                  setForm({ ...form, brand: e.target.value })
                }
                required
                style={inputStyle}
              />

              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
                style={inputStyle}
              />

              <input
                placeholder="Secret Key"
                type="password"
                value={form.secret}
                onChange={(e) =>
                  setForm({ ...form, secret: e.target.value })
                }
                required
                style={inputStyle}
              />

              <button style={btnStyle} type="submit">
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/*  CSS OVERRIDE (fix invisible form issue) */}
      <style>
        {`
          .modal-box input {
            background: #222 !important;
            color: #fff !important;
            display: block !important;
            opacity: 1 !important;
          }

          .modal-box form {
            display: block !important;
            opacity: 1 !important;
          }
        `}
      </style>
    </>
  );
}

/* styles */
const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  background: "#222",
  border: "1px solid #555",
  color: "#fff",
  borderRadius: "5px"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#4ade80",
  border: "none",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "5px"
}; 