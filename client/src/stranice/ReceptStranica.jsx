import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import KreirajKategoriju from "../components/kategorija/KreirajKategoriju";
import KreirajRecept from "../components/recepti/KreirajRecept";
import ListaRecepata from "../components/recepti/ListaRecepata";

export default function ReceptStranica() {
  const [kategorije, setKategorije] = useState([]);
  const [recepti, setRecepti] = useState([]);
  const [notice, setNotice] = useState("");

  // FILTER STATE
  const [kategorijaId, setKategorijaId] = useState("");
  const [minOcena, setMinOcena] = useState(0);
  const [maxOcena, setMaxOcena] = useState(5);

  async function loadKategorije() {
    const res = await apiGet("/kategorije/sve");
    setKategorije(res.kategorije || []);
  }

  async function loadRecepti() {
    const qs = new URLSearchParams({
      ...(kategorijaId ? { kategorijaId } : {}),
      minOcena: String(minOcena ?? 0),
      maxOcena: String(maxOcena ?? 5),
    }).toString();

    const res = await apiGet(`/recepti/svi?${qs}`);
    setRecepti(res.recepti || []);
  }

  useEffect(() => {
    loadKategorije();
  }, []);

  // svaki put kad se promene filteri, učitaj iznova
  useEffect(() => {
    loadRecepti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kategorijaId, minOcena, maxOcena]);

  async function createKategorija(payload) {
    try {
      const res = await apiPost("/kategorije/kreiraj", payload);
      setNotice(res.poruka || "Kategorija kreirana.");
      await loadKategorije();
    } catch {
      setNotice("Greška pri kreiranju kategorije.");
    } finally {
      setTimeout(() => setNotice(""), 2500);
    }
  }

  async function createRecept(payload) {
    try {
      const res = await apiPost("/recepti/kreiraj", payload);
      setNotice(res.poruka || "Recept je kreiran.");
      await loadRecepti();
    } catch {
      setNotice("Greška pri kreiranju recepta.");
    } finally {
      setTimeout(() => setNotice(""), 2500);
    }
  }

  async function rateRecept(id, ocena) {
    try {
      const res = await apiPost("/recepti/oceni", { id, ocena });
      setNotice(res.poruka || "Ocena sačuvana.");
      await loadRecepti();
    } catch {
      setNotice("Greška pri ocenjivanju.");
    } finally {
      setTimeout(() => setNotice(""), 2000);
    }
  }

  // helper da min ne pređe max i obrnuto (lagana zaštita)
  function onMinChange(v) {
    const x = Number(v);
    setMinOcena(Number.isFinite(x) ? Math.max(0, Math.min(x, 5)) : 0);
    if (x > maxOcena) setMaxOcena(Math.min(5, x));
  }
  function onMaxChange(v) {
    const x = Number(v);
    setMaxOcena(Number.isFinite(x) ? Math.max(0, Math.min(x, 5)) : 5);
    if (x < minOcena) setMinOcena(Math.max(0, x));
  }

  return (
    <div className="wrap stack">
      {notice && <div className="card" style={{ color: "#0a6" }}>{notice}</div>}

      {/* 1) Kreiranje kategorije */}
      <KreirajKategoriju onCreate={createKategorija} />

      {/* 2) Filteri */}
      <div className="card">
        <div className="card-h">Filter</div>
        <div className="row">
          <select
            className="inp"
            value={kategorijaId}
            onChange={(e) => setKategorijaId(e.target.value)}
          >
            <option value="">Sve kategorije</option>
            {kategorije.map(k => (
              <option key={k.id} value={k.id}>{k.naziv}</option>
            ))}
          </select>

          <button className="btn" onClick={loadRecepti}>Primeni</button>
        </div>
      </div>

      {/* 3) Kreiranje recepta */}
      <KreirajRecept onCreate={createRecept} kategorije={kategorije} />

      {/* 4) Lista recepata */}
      <ListaRecepata recepti={recepti} onRate={rateRecept} />
    </div>
  );
}