import express, { Request, Response, NextFunction } from "express";
import playersRouter from "./players";
import agentsRouter from "./agents";
import bodyValidator from "../middleware/bodyValidator";
import idValidator from "../middleware/idValidator";

const router = express.Router();

// Logs the requested URL and the method
router.use("*", (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}: ${req.originalUrl}`);
	next();
});

// Validates all endpoints accepting id as a parameter
router.use(["/players/:id", "/agents/:id"], idValidator);

// Validates the body in POST and PUT requests
router.use(["/players", "/agents"], bodyValidator);

// Route to /api/players endpoints
router.use("/players", playersRouter);

// Route to /api/agents endpoints
router.use("/agents", agentsRouter);

export default router;
