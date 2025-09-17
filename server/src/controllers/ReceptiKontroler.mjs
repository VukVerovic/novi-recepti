import { v4 as uuid } from "uuid";
import Recept from "../models/Recept.mjs";
import Kategorija from "../models/Kategorija.mjs";

class ReceptiKontroler {
  // GET /recepti/svi?kategorijaId=...
  svi = async (req, res) => {
  try {
    const kategorijaId = (req.query.kategorijaId ?? "").toString().trim();
    const minOcena = Number(req.query.minOcena ?? 0);
    const maxOcena = Number(req.query.maxOcena ?? 5);

    // 1) Učitavanje
    const recepti = kategorijaId
      ? await Recept.scan("kategorijaId").eq(kategorijaId).all().exec()
      : await Recept.scan().all().exec();

    // 2) Prosek + filtriranje po oceni (prosek između min–max)
    const mapirani = recepti
      .map(r => {
        const prosecnaOcena = r.brojOcena ? +(r.zbirOcena / r.brojOcena).toFixed(2) : 0;
        return { ...r, prosecnaOcena };
      })
      .filter(r => r.prosecnaOcena >= minOcena && r.prosecnaOcena <= maxOcena);

    res.json({ recepti: mapirani });
  } catch (e) {
    console.error("Greška pri listanju recepata:", e);
    res.status(500).json({ greska: "Greška pri učitavanju recepata." });
  }
};

  // POST /recepti/kreiraj  body: { naslov, tekst, kategorijaId }
  kreiraj = async (req, res) => {
    try {
      const { naslov, tekst, kategorijaId } = req.body || {};
      if (!naslov || !tekst || !kategorijaId) {
        return res.status(400).json({ greska: "Naslov, tekst i kategorija su obavezni." });
      }

      const kat = await Kategorija.get(kategorijaId);
      if (!kat) return res.status(404).json({ greska: "Kategorija ne postoji." });

      const recept = new Recept({
        id: uuid(),
        naslov,
        tekst,
        kategorijaId,
        zbirOcena: 0,
        brojOcena: 0,
      });

      const sacuvan = await recept.save();
      res.status(201).json({ poruka: "Recept je kreiran.", recept: sacuvan });
    } catch (e) {
      console.error("Greška pri kreiranju recepta:", e);
      res.status(500).json({ greska: "Greška pri kreiranju recepta." });
    }
  };

  // POST /recepti/oceni  body: { id, ocena }
  oceni = async (req, res) => {
    try {
      const { id, ocena } = req.body || {};
      const vrednost = Number(ocena);
      if (!id || !Number.isFinite(vrednost) || vrednost < 1 || vrednost > 5) {
        return res.status(400).json({ greska: "Neispravan ID ili ocena (1–5)." });
      }

      const recept = await Recept.get(id);
      if (!recept) return res.status(404).json({ greska: "Recept nije pronađen." });

      const updated = await Recept.update(id, {
        zbirOcena: (recept.zbirOcena || 0) + vrednost,
        brojOcena: (recept.brojOcena || 0) + 1,
      });

      const prosecnaOcena = updated.brojOcena
        ? +(updated.zbirOcena / updated.brojOcena).toFixed(2)
        : 0;

      res.json({ poruka: "Ocena je zabeležena.", recept: { ...updated, prosecnaOcena } });
    } catch (e) {
      console.error("Greška pri ocenjivanju recepta:", e);
      res.status(500).json({ greska: "Greška pri ocenjivanju recepta." });
    }
  };
}

export default ReceptiKontroler;