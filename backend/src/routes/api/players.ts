import express, { Request, Response } from "express";
import * as db from "../../database/database";

const PLAYER_POSITIONS = ["GK", "LB", "RB", "CB", "CDM", "CM", "CAM", "LW", "RW", "ST"];

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

// Create a new player
router.post("/", (req: Request, res: Response) => {
	const validPlayerKeys = ["firstName", "lastName", "age", "nationality", "club", "position", "wage", "value", "history", "agent"];
	for (const key of validPlayerKeys) {
		if (!(key in req.body)) {
			res.status(400).send(`${key} missing in request body`);
			return;
		}
		if (key === "position" && !PLAYER_POSITIONS.includes(req.body.position)) {
			res.status(400).send("invalid position");
			return;
		}
	}
	for (const key in req.body) {
		if (!validPlayerKeys.includes(key)) delete req.body[key];
	}
	db.createPlayer(req.body)
		.then((player) => {
			res.json(player);
		})
		.catch((err) => {
			console.log(err.message);
			res.send(err.message);
		});
});

// Deletes a player by id
router.delete("/:id", (req: Request, res: Response) => {
	const id = +req.params.id;
	if (!isNaN(id)) {
		db.deletePlayerById(id)
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
