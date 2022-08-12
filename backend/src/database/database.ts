import { Pool } from "pg";

class Db {
	client: Pool;

	constructor() {
		this.client = new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false },
			idleTimeoutMillis: 0,
			connectionTimeoutMillis: 0,
			keepAlive: true,
			port: 5432,
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
