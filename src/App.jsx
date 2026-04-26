import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Login from "./pages/Login";
import "./App.css"
import Blockchain from './components/Blockchain'
import Footer from './components/Footer'
//import Manufacturer from './components/Manufaturer'

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      {/*  <Route path="/login" element={<Login />} />*/}
      </Routes>
    </BrowserRouter>
    <Blockchain/>
    <Footer/>
    
  </>
 
}