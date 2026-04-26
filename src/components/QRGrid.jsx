// QRGrid.jsx
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

export default function QRGrid() {
  return (
    <div className="qr-grid">
      {qrPattern.map((v, i) => (
        <div key={i} className={`qr-cell ${v ? "on" : ""}`} />
      ))}
    </div>
  );
} 
