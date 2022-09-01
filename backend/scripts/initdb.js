/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
require("dotenv").config();
const { Client } = require("pg");
const { getAgent, getPlayer, fetchClubs } = require("./fakedata");

const AGENTS_NUM = 15;
const PLAYERS_NUM = 50;

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

client.connect().then(async () => {
	try {
		console.log("drop tables");
		await dropTables();
		console.log("create agents");
		await createAgentsTable();
		console.log("create players");
		await createPlayersTable();
		if (process.env.FOOTBALL_API_KEY) {
			console.log("insert agents");
			const ids = await insertAgents();
			console.log("insert players");
			await insertPlayers(ids);
		}
		client.end();
	} catch (e) {
		console.log(e.message);
		client.end();
	}
});

async function dropTables() {
	await client.query("DROP TABLE IF EXISTS players");
	await client.query("DROP TABLE IF EXISTS agents");
}

async function createAgentsTable() {
	const sql = `CREATE TABLE IF NOT EXISTS agents(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL)`;
	await client.query(sql);
}

async function createPlayersTable() {
	const sql = `CREATE TABLE IF NOT EXISTS players(
    id SERIAL PRIMARY KEY,
	first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
	age INTEGER NOT NULL,
	nationality VARCHAR(50) NOT NULL,
	club VARCHAR(50) NOT NULL,
	position VARCHAR(8) NOT NULL,
	wage INTEGER NOT NULL,
	value INTEGER NOT NULL,
    clubs_history TEXT[] NOT NULL,
    agent_id SERIAL NOT NULL,
    FOREIGN KEY(agent_id) REFERENCES agents(id))`;
	await client.query(sql);
}

async function insertAgents() {
	const agents = [];
	for (let i = 0; i < AGENTS_NUM; i++) agents.push(await getAgent());
	agentsValues = agents.map((agent) => Object.values(agent));
	let sql = "INSERT INTO agents (name,email,phone) VALUES ";
	for (let i = 0; i < AGENTS_NUM; i++) {
		const offset = i * 3;
		sql += `($${offset + 1}, $${offset + 2}, $${offset + 3}),`;
	}
	sql = sql.slice(0, -1);
	await client.query(sql, agentsValues.flat());
	const ids = agents.map((agent, index) => index + 1);
	return ids;
}

async function insertPlayers(ids) {
	const clubs = await fetchClubs();
	const players = [];
	for (let i = 0; i < PLAYERS_NUM; i++) players.push(await getPlayer(ids, [...clubs]));
	playersValues = players.map((player) => Object.values(player));
	let sql = "INSERT INTO players (first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id) VALUES ";
	for (let i = 0; i < PLAYERS_NUM; i++) {
		const offset = i * 10;
		sql += `($${offset + 1},$${offset + 2},$${offset + 3},$${offset + 4},$${offset + 5},$${offset + 6},
		$${offset + 7},$${offset + 8},$${offset + 9},$${offset + 10}),`;
	}
	sql = sql.slice(0, -1);
	await client.query(sql, playersValues.flat());
}
