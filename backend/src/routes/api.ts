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
	db.getAllPlayers()
		.then((players) => {
			res.json(players);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

// Sends a player by id
router.get("/players/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	if (!isNaN(id)) {
		db.getPlayerById(id)
			.then((player) => {
				if (player) res.json(player);
				else res.sendStatus(404);
			})
			.catch((err) => {
				console.log(err.message);
				res.sendStatus(500);
			});
	} else {
		res.status(400).send({ error: "Id must be a number" });
	}
});

// Sends all the agents
router.get("/agents", (req: Request, res: Response) => {
	db.getAllAgents()
		.then((agents) => {
			res.json(agents);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

// Sends an agent by id
router.get("/agents/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	if (!isNaN(id)) {
		db.getAgentById(id)
			.then((agent) => {
				if (agent) res.json(agent);
				else res.sendStatus(404);
			})
			.catch((err) => {
				console.log(err.message);
				res.sendStatus(500);
			});
	} else {
		res.status(400).send({ error: "Id must be a number" });
	}
});

export default router;
