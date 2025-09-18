import "dotenv/config";
import express from "express";
import cors from "cors";

import receptiRouter from "./routers/recepti.mjs";
import komentariRouter from "./routers/komentari.mjs";
import kategorijeRouter from "./routers/kategorije.mjs";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recepti", receptiRouter);
app.use("/komentari", komentariRouter);
app.use("/kategorije", kategorijeRouter);

app.get("/health", (_req, res) => res.json({ message: "ok" }));

export default app;