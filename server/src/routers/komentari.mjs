import { Router } from "express";
import KomentariKontroler from "../controllers/KomentariKontroler.mjs";

const router = Router();
const c = new KomentariKontroler();

router.get("/", c.sviPoReceptu);
router.post("/dodaj", c.dodaj);

export default router;