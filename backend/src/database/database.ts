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

	async getAllPlayers(): Promise<any[]> {
		const sql = "SELECT * FROM players";
		return (await this.client.query(sql)).rows;
	}

	async getPlayerById(id: number): Promise<any> {
		const sql = "SELECT * FROM players WHERE id = $1";
		return (await this.client.query(sql, [id])).rows[0];
	}

	async getAllAgents(): Promise<any[]> {
		const sql = "SELECT * FROM agents";
		return (await this.client.query(sql)).rows;
	}

	async getAgentById(id: number): Promise<any> {
		const sql = "SELECT * FROM agents WHERE id = $1";
		return (await this.client.query(sql, [id])).rows[0];
	}
}

export default Db;
