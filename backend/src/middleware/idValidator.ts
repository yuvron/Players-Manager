import { Request, Response, NextFunction } from "express";

const idValidator = (req: Request, res: Response, next: NextFunction): void => {
	const id = +req.params.id;
	if (isNaN(id)) {
		res.status(400).send({ error: "Id must be a number" });
		return;
	}
	next();
};

export default idValidator;
