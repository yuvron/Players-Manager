import express, { Request, Response } from "express";
import * as db from "../../database/database";

const router = express.Router();

// Sends all the agents
router.get("/", (req: Request, res: Response) => {
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
router.get("/:id", (req: Request, res: Response) => {
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
