import { useRef } from "react";

export default function KreirajKategoriju({ onCreate }) {
  const ref = useRef();
  function submit(e){
    e.preventDefault();
    const naziv = ref.current.value.trim();
    if(!naziv) return;
    onCreate({ naziv });
    ref.current.value = "";
  }
  return (
    <form onSubmit={submit} className="card">
      <div className="card-h">Nova kategorija</div>
      <div className="row">
        <input className="inp" placeholder="npr. Kolači, Salate…" ref={ref} required />
        <button className="btn">Dodaj</button>
      </div>
    </form>
  );
}