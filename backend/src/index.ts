import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express, { Request, Response } from "express";
import { json } from "body-parser";
import * as db from "./database/database";
import apiRouter from "./routes/api";

const PORT = +process.env.PORT || 5000;

const app = express();

db.connect()
	.then(() => {
		console.log("Connected to database");
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => console.log(err.message));

app.use(json());

// Route to api endpoints
app.use("/api", apiRouter);

// Serve static files if in production mode
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "build")));

	app.get("*", (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, "../build/index.html"));
	});
}
