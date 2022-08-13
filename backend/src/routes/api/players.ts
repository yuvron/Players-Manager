import express, { Request, Response } from "express";
import * as db from "../../database/database";

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

export default router;
