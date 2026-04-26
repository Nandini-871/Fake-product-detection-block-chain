import { useState } from "react";

export default function LoginModel({ isOpen, onClose }) {
  const [form, setForm] = useState({
    username: "",
    email: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User Data:", form);

    alert(`Welcome ${form.username}`);
    onClose(); // close modal
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <h2 style={{ color: "var(--primary-glow)" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
            style={inputStyle}
          />

          <button className="verify-btn" type="submit">
            Continue
          </button>
        </form>

        <button onClick={onClose} style={closeBtnStyle}>
          ✕
        </button>
      </div>
    </div>
  );
}

/* styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000,
  backdropFilter: "blur(5px)"
};

const boxStyle = {
  background: "#085041",
  padding: "30px",
  borderRadius: "10px",
  width: "350px",
  color: "#fff",
  position: "relative"
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #555",
  background: "#222",
  color: "#fff"
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer"
};