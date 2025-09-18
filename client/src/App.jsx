import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Pocetna from "./stranice/ReceptStranica.jsx";
import "./styles/recipes.css";

export default function App(){
  return (
    <BrowserRouter>
      <div className="wrap">
        <header className="row" style={{ marginBottom: 12, justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, color: "#001affb6" }}>Recepti</h1>
          <nav className="row">
            <NavLink className="btn" to="/">Početna</NavLink>
            <NavLink className="btn" to="/recepti">Recepti</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<div className="card">Dobrodošli u kolekciju recepata!</div>} />
          <Route path="/recepti" element={<Pocetna />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}