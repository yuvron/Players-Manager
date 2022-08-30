import express, { Request, Response } from "express";
import * as db from "../database/controller";

const router = express.Router();

// Sends all the players
router.get("/", (req: Request, res: Response) => {
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
router.get("/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	db.getPlayerById(id)
		.then((player) => {
			if (player) res.json(player);
			else res.sendStatus(404);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

// Create a new player
router.post("/", (req: Request, res: Response) => {
	db.createPlayer(req.body)
		.then((player) => {
			res.json(player);
		})
		.catch((err) => {
			console.log(err.message);
			res.send(err.message);
		});
});

// Update a player by id
router.put("/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	db.updatePlayer(id, req.body)
		.then((player) => {
			if (player) res.json(player);
			else res.sendStatus(404);
		})
		.catch((err) => {
			console.log(err.message);
			res.send(err.message);
		});
});

// Deletes a player by id
router.delete("/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	db.deletePlayer(id)
		.then((player) => {
			if (player) res.json(player);
			else res.sendStatus(404);
		})
		.catch((err) => {
			console.log(err.message);
			res.sendStatus(500);
		});
});

export default router;
