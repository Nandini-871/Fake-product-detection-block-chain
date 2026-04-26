import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Scanner from "../components/Scanner";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import LoginModel from "../components/LoginModel";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />

      <Hero />

      <section id="scanner">
        <Scanner />
      </section>

      <section id="how">
        <HowItWorks />
      </section>

      <section id="features">
        <Features />
      </section>

      {/*  Modal yaha control hoga */}
      < LoginModel
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}