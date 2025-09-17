import dynamoose from "../config/dbconfig.mjs";

const lokalno = process.env.LOCAL;
const config = { create: Boolean(lokalno), waitForActive: Boolean(lokalno) };

const shema = new dynamoose.Schema({
  id: String,
  naziv: String,
  datumKreiranja: { type: Date, default: Date.now },
});

const Kategorija = dynamoose.model("Kategorija", shema, config);
export default Kategorija;