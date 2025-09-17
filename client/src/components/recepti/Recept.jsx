import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "../../services/api";

export default function Recept({ recept, onRate }) {
  const [komentari, setKomentari] = useState([]);
  const [ocena, setOcena] = useState(5);
  const inputRef = useRef();

  const prosek = recept.prosecnaOcena ?? (recept.brojOcena ? (recept.zbirOcena / recept.brojOcena) : 0);

  async function loadKomentari() {
    const qs = new URLSearchParams({ receptId: recept.id }).toString();
    const data = await apiGet(`/komentari?${qs}`);
    const sorted = (data.komentari || []).sort((a,b)=>new Date(a.datumKreiranja)-new Date(b.datumKreiranja));
    setKomentari(sorted);
  }

  async function addKomentar(e) {
    e.preventDefault();
    const tekst = inputRef.current.value.trim();
    if (!tekst) return;
    await apiPost("/komentari/dodaj", { tekst, receptId: recept.id });
    inputRef.current.value = "";
    loadKomentari();
  }

  async function rate(e) {
    e.preventDefault();
    if (typeof onRate === "function") {
      await onRate(recept.id, Number(ocena));
    }
  }

  useEffect(() => { loadKomentari(); }, [recept.id]);

  return (
    <div className="card recipe-card">
      <h3 className="recipe-title">{recept.naslov}</h3>
      <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{recept.tekst}</p>

      <div className="divider" />
      <div className="row" style={{ alignItems: "center" }}>
        <div className="rating-badge">
          <span className="rating-value">{Number(prosek).toFixed(2)}</span>
          <span className="rating-label">prosek</span>
        </div>
        <div className="muted">Broj ocena: {recept.brojOcena || 0}</div>
      </div>

      <form onSubmit={rate} className="row" style={{ marginTop: 8 }}>
        <select className="inp" value={ocena} onChange={e=>setOcena(e.target.value)}>
          {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>
        <button className="btn">Oceni</button>
      </form>

      <div className="divider" />
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Komentari</div>
      {komentari.length ? komentari.map(k=>(
        <div key={k.id} className="comment">
          <div style={{ whiteSpace: "pre-wrap" }}>{k.tekst}</div>
        </div>
      )) : <div className="muted">Još nema komentara.</div>}

      <form onSubmit={addKomentar} className="row" style={{ marginTop: 10 }}>
        <input className="inp" placeholder="Dodaj komentar…" ref={inputRef} />
        <button className="btn">Dodaj</button>
      </form>
    </div>
  );
}