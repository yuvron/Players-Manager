import express, { Request, Response, NextFunction } from "express";
import Db from "../database/database";

const db = new Db();
db.connect().catch((err) => console.log(`Database Connection Error: ${err.message}`));

const router = express.Router();

// Logs the requested URL and the method
router.use("*", (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}: ${req.originalUrl}`);
	next();
});

// Sends all the players
router.get("/players", (req: Request, res: Response) => {
	const players = db
		.getAllPlayers()
		.then((players) => {
			res.json(players);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

// Sends all the agents
router.get("/agents", (req: Request, res: Response) => {
	const agents = db
		.getAllAgents()
		.then((agents) => {
			res.json(agents);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

export default router;
