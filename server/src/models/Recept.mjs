import dynamoose from "../config/dbconfig.mjs";

const lokalno = process.env.LOCAL;
const config = { create: Boolean(lokalno), waitForActive: Boolean(lokalno) };

const shema = new dynamoose.Schema({
  id: String,
  naslov: String,
  tekst: String,
  kategorijaId: String,
  zbirOcena: { type: Number, default: 0 },
  brojOcena: { type: Number, default: 0 },
  datumKreiranja: { type: Date, default: Date.now },
});

const Recept = dynamoose.model("Recept", shema, config);
export default Recept;