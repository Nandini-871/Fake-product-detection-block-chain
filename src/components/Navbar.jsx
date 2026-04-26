export default function Navbar({ onLoginClick }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav>
      <div className="logo">
        <div className="logo-icon">
          <span></span><span></span><span></span><span></span>
        </div>
        VERIFYX
      </div>

      <ul className="nav-links">
        <li><a onClick={() => scrollTo("scanner")}>Scanner</a></li>
        <li><a onClick={() => scrollTo("how")}>How</a></li>
        <li><a onClick={() => scrollTo("features")}>Features</a></li>
      </ul>

      <button className="nav-btn" onClick={onLoginClick}>
       MY account
      </button>
      
    </nav>
  );
}