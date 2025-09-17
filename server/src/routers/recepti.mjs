import { Router } from "express";
import ReceptiKontroler from "../controllers/ReceptiKontroler.mjs";

const router = Router();
const r = new ReceptiKontroler();

router.get("/svi", r.svi);
router.post("/kreiraj", r.kreiraj);
router.post("/oceni", r.oceni);

export default router;