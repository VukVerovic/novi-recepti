import dynamoose from "../config/dbconfig.mjs";

const lokalno = process.env.LOCAL;
const config = { create: Boolean(lokalno), waitForActive: Boolean(lokalno) };

const shema = new dynamoose.Schema({
  id: String,
  tekst: String,
  receptId: String,
  datumKreiranja: { type: Date, default: Date.now },
});

const Komentar = dynamoose.model("Komentar", shema, config);
export default Komentar;