import { useRef, useState } from "react";

export default function KreirajRecept({ onCreate, kategorije = [] }) {
  const naslovRef = useRef();
  const tekstRef = useRef();
  const [kategorijaId, setKategorijaId] = useState(kategorije[0]?.id || "");

  function submit(e) {
    e.preventDefault();
    const naslov = naslovRef.current.value.trim();
    const tekst = tekstRef.current.value.trim();
    if (!naslov || !tekst || !kategorijaId) return;

    onCreate({ naslov, tekst, kategorijaId });
    naslovRef.current.value = "";
    tekstRef.current.value = "";
    setKategorijaId(kategorije[0]?.id || "");
  }

  return (
    <form onSubmit={submit} className="card">
      <div className="card-h">Dodaj recept</div>
      <div className="row">
        <input className="inp" placeholder="Naslov recepta…" ref={naslovRef} required />
        <select className="inp" value={kategorijaId} onChange={e=>setKategorijaId(e.target.value)} required>
          {kategorije.map(k => <option key={k.id} value={k.id}>{k.naziv}</option>)}
        </select>
      </div>
      <textarea className="inp" placeholder="Tekst / priprema…" ref={tekstRef} required />
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="btn">Sačuvaj</button>
      </div>
    </form>
  );
}