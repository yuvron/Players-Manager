import express, { Request, Response } from "express";
import Db from "../database/database";

const db = new Db();
db.connect().catch((err) => console.log(`Database Connection Error: ${err.message}`));

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	res.send("api");
});

export default router;
