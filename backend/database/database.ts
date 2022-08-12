import { Client } from "pg";

class Db {
	client: Client;

	constructor() {
		this.client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false },
		});
	}

	async connect(): Promise<void> {
		await this.client.connect();
	}
}

export default Db;
