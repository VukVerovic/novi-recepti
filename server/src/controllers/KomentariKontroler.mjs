import { v4 as uuid } from "uuid";
import Komentar from "../models/Komentar.mjs";

class KomentariKontroler {
  // GET /komentari?receptId=...
  sviPoReceptu = async (req, res) => {
    try {
      const receptId = (req.query.receptId ?? "").toString().trim();
      if (!receptId) return res.status(400).json({ greska: "Nedostaje receptId." });

      const komentari = await Komentar.scan("receptId").eq(receptId).all().exec();
      res.json({ komentari });
    } catch (e) {
      console.error("Greška pri učitavanju komentara:", e);
      res.status(500).json({ greska: "Greška pri učitavanju komentara." });
    }
  };

  // POST /komentari/dodaj  body: { tekst, receptId }
  dodaj = async (req, res) => {
    try {
      const { tekst, receptId } = req.body || {};
      if (!tekst || !receptId) {
        return res.status(400).json({ greska: "Tekst i receptId su obavezni." });
      }

      const novi = new Komentar({ id: uuid(), tekst, receptId });
      const sacuvan = await novi.save();

      res.status(201).json({ poruka: "Komentar dodat.", komentar: sacuvan });
    } catch (e) {
      console.error("Greška pri dodavanju komentara:", e);
      res.status(500).json({ greska: "Greška pri dodavanju komentara." });
    }
  };
}

export default KomentariKontroler;