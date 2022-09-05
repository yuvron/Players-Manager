import express, { Request, Response, NextFunction } from "express";
import playersRouter from "./players";
import agentsRouter from "./agents";

const router = express.Router();

// Logs the requested URL and the method
router.use("*", (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}: ${req.originalUrl}`);
	next();
});

// Route to /api/players endpoints
router.use("/players", playersRouter);

// Route to /api/agents endpoints
router.use("/agents", agentsRouter);

export default router;
