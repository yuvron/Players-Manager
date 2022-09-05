import { Request, Response, NextFunction } from "express";

const PLAYER_VALID_KEYS = ["first_name", "last_name", "age", "nationality", "club", "position", "wage", "value", "clubs_history", "agent_id"];
const AGENT_VALID_KEYS = ["name", "email", "phone"];

const PLAYER_POSITIONS = ["GK", "LB", "RB", "CB", "CDM", "CM", "CAM", "LW", "RW", "ST"];

function validator(isPlayer: boolean, body: Object): void {
	const validKeys = isPlayer ? PLAYER_VALID_KEYS : AGENT_VALID_KEYS;
	for (const key of validKeys) {
		if (!(key in body)) {
			throw new Error(`${key} missing in request body`);
		}
		if (isPlayer && key === "position" && !PLAYER_POSITIONS.includes(body[key])) {
			throw new Error("invalid position");
		}
	}
	for (const key in body) {
		if (!validKeys.includes(key)) delete body[key];
	}
}

function bodyValidator(req: Request, res: Response, next: NextFunction): void {
	try {
		const isPlayer = req.originalUrl.split("/")[2] === "players";
		validator(isPlayer, req.body);
		next();
	} catch (err) {
		res.status(400).send(err.message);
	}
}

export default bodyValidator;
