import Recept from "./Recept";

export default function ListaRecepata({ recepti, kategorijeMap, onRate }) {
  if (!recepti?.length) return <div className="card muted">Nema recepata.</div>;
  return (
    <>
      {recepti.map(r => (
        <Recept
          key={r.id}
          recept={r}
          onRate={onRate}
        />
      ))}
    </>
  );
}