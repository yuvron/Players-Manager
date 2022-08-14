import { Pool } from "pg";

const client = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
	idleTimeoutMillis: 0,
	connectionTimeoutMillis: 0,
	keepAlive: true,
	port: 5432,
});

export async function connect(): Promise<void> {
	await client.connect();
}

export async function getAllPlayers(): Promise<any[]> {
	const sql = "SELECT * FROM players";
	return (await client.query(sql)).rows;
}

export async function getPlayerById(id: number): Promise<any> {
	const sql = "SELECT * FROM players WHERE id = $1";
	return (await client.query(sql, [id])).rows[0];
}

export async function createPlayer({ firstName, lastName, age, nationality, club, position, wage, value, history, agent }): Promise<any> {
	const sql = `INSERT INTO players
	(first_name,last_name,age,nationality,club,position,wage,value,clubs_history,agent_id)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	RETURNING *`;
	return (await client.query(sql, [firstName, lastName, age, nationality, club, position, wage, value, history, agent])).rows[0];
}

export async function getAllAgents(): Promise<any[]> {
	const sql = "SELECT * FROM agents";
	return (await client.query(sql)).rows;
}

export async function getAgentById(id: number): Promise<any> {
	const sql = "SELECT * FROM agents WHERE id = $1";
	return (await client.query(sql, [id])).rows[0];
}
