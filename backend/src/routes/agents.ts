import express, { Request, Response } from "express";
import * as db from "../database/controller";
import idValidator from "../middleware/idValidator";
import bodyValidator from "../middleware/bodyValidator";

const router = express.Router();

// Validates all endpoints accepting id as a parameter
router.use("/:id", idValidator);

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
	db.getAgentById(id)
		.then((agent) => {
			if (agent) res.json(agent);
			else res.sendStatus(404);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

// Create a new agent
router.post("/", bodyValidator, (req: Request, res: Response) => {
	db.createAgent(req.body)
		.then((player) => {
			res.json(player);
		})
		.catch((err) => {
			console.log(err.message);
			res.send(err.message);
		});
});

// Update a player by id
router.put("/:id", bodyValidator, (req: Request, res: Response) => {
	const id = +req.params.id;
	db.updateAgent(id, req.body)
		.then((agent) => {
			if (agent) res.json(agent);
			else res.sendStatus(404);
		})
		.catch((err) => {
			console.log(err.message);
			res.send(err.message);
		});
});

// Deletes an agent by id
router.delete("/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	db.deleteAgent(id)
		.then((agent) => {
			if (agent) res.json(agent);
			else res.sendStatus(404);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

export default router;
