import { Pool } from "pg";

const client = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
	idleTimeoutMillis: 72000000,
	connectionTimeoutMillis: 72000000,
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

export async function deletePlayer(id: number): Promise<any> {
	const sql = "DELETE FROM players WHERE id = $1 RETURNING *";
	return (await client.query(sql, [id])).rows[0];
}

export async function createPlayer({ first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id }): Promise<any> {
	const sql = `INSERT INTO players
	(first_name,last_name,age,nationality,club,position,wage,value,clubs_history,agent_id)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	RETURNING *`;
	return (await client.query(sql, [first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id])).rows[0];
}

export async function updatePlayer(id: number, { first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id }): Promise<any> {
	const sql = `UPDATE players
	SET first_name = $1, last_name = $2, age = $3,
	nationality = $4, club = $5, position = $6,
	wage = $7, value = $8, clubs_history = $9,
	agent_id = $10
	WHERE id = $11
	RETURNING *`;
	return (await client.query(sql, [first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id, id])).rows[0];
}

export async function getAllAgents(): Promise<any[]> {
	const sql = "SELECT * FROM agents";
	return (await client.query(sql)).rows;
}

export async function getAgentById(id: number): Promise<any> {
	const sql = "SELECT * FROM agents WHERE id = $1";
	return (await client.query(sql, [id])).rows[0];
}

export async function deleteAgent(id: number): Promise<any> {
	const sql = "DELETE FROM agents WHERE id = $1 RETURNING *";
	return (await client.query(sql, [id])).rows[0];
}

export async function createAgent({ name, email, phone }): Promise<any> {
	const sql = `INSERT INTO agents
	(name, email, phone)
	VALUES ($1, $2, $3)
	RETURNING *`;
	return (await client.query(sql, [name, email, phone])).rows[0];
}

export async function updateAgent(id: number, { name, email, phone }): Promise<any> {
	const sql = `UPDATE agents
	SET name = $1, email = $2, phone = $3
	WHERE id = $4
	RETURNING *`;
	return (await client.query(sql, [name, email, phone, id])).rows[0];
}
