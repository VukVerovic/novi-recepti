import { v4 as uuid } from "uuid";
import Kategorija from "../models/Kategorija.mjs";

class KategorijeKontroler {
  sve = async (_req, res) => {
    try {
      const kategorije = await Kategorija.scan().all().exec();
      res.json({ kategorije });
    } catch (e) {
      console.error("Greška pri listanju kategorija:", e);
      res.status(500).json({ greska: "Greška pri učitavanju kategorija." });
    }
  };

  // POST /kategorije/kreiraj  body: { naziv }
  kreiraj = async (req, res) => {
    try {
      const { naziv } = req.body || {};
      if (!naziv?.trim()) {
        return res.status(400).json({ greska: "Naziv kategorije je obavezan." });
      }
      const kat = new Kategorija({ id: uuid(), naziv: naziv.trim() });
      const sacuvano = await kat.save();
      res.status(201).json({ poruka: "Kategorija kreirana.", kategorija: sacuvano });
    } catch (e) {
      console.error("Greška pri kreiranju kategorije:", e);
      res.status(500).json({ greska: "Greška pri kreiranju kategorije." });
    }
  };
}

export default KategorijeKontroler;