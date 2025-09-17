import { Router } from "express";
import KategorijeKontroler from "../controllers/KategorijeKontroler.mjs";

const router = Router();
const k = new KategorijeKontroler();

router.get("/sve", k.sve);
router.post("/kreiraj", k.kreiraj);

export default router;