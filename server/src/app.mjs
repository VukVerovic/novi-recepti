import "dotenv/config";
import express from "express";
import cors from "cors";

import receptiRouter from "./routes/recepti.mjs";
import komentariRouter from "./routes/komentari.mjs";
import kategorijeRouter from "./routes/kategorije.mjs";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recepti", receptiRouter);
app.use("/komentari", komentariRouter);
app.use("/kategorije", kategorijeRouter);

app.get("/health", (_req, res) => res.json({ message: "ok" }));

export default app;