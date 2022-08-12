/* eslint-disable @typescript-eslint/explicit-function-return-type */
const randomCountry = require("random-country");
const createMobilePhoneNumber = require("random-mobile-numbers");
const axios = require("axios");

FAKE_DATA_API = "https://api.namefake.com/";
FOOTBALL_CLUBS_API = "https://v3.football.api-sports.io/teams?league=39&season=2022";

async function fetchRandomData() {
	let response = undefined;
	let name = [];
	while (name.length !== 2) {
		response = (await axios.get(FAKE_DATA_API)).data;
		name = response.name.split(" ");
	}
	return {
		firstName: name[0],
		lastName: name[1],
		email: `${name[0]}${Math.floor(Math.random() * 10)}@gmail.com`,
		phone: createMobilePhoneNumber("UK"),
	};
}

async function fetchClubs() {
	const response = (
		await axios.get(FOOTBALL_CLUBS_API, {
			headers: {
				"x-rapidapi-host": "v3.football.api-sports.io",
				"x-rapidapi-key": process.env.FOOTBALL_API_KEY,
			},
		})
	).data.response;
	const clubs = response.map((club) => club.team.name);
	return clubs;
}

async function getAgent() {
	const { firstName, lastName, email, phone } = await fetchRandomData();
	return {
		name: `${firstName} ${lastName}`,
		email: email,
		phone: phone,
	};
}

async function getPlayer(agentsIds, clubs) {
	const { firstName, lastName } = await fetchRandomData();
	const currentClub = clubs.splice(Math.floor(Math.random() * clubs.length), 1)[0];
	const historyClub1 = clubs.splice(Math.floor(Math.random() * clubs.length), 1)[0];
	const historyClub2 = clubs.splice(Math.floor(Math.random() * clubs.length), 1)[0];
	const historyClub3 = clubs.splice(Math.floor(Math.random() * clubs.length), 1)[0];
	return {
		first_name: firstName,
		last_name: lastName,
		age: generateAge(),
		nationality: randomCountry({ full: true }),
		club: currentClub,
		position: generatePosition(),
		wage: generateWage(),
		value: generateValue(),
		clubs_history: [historyClub1, historyClub2, historyClub3],
		agent_id: agentsIds[Math.floor(Math.random() * agentsIds.length)],
	};
}

function generateAge() {
	const minAge = 17;
	const maxAge = 39;
	return minAge + Math.floor(Math.random() * (maxAge - minAge));
}

function generatePosition() {
	const positions = ["GK", "LB", "RB", "CB", "CDM", "CM", "CAM", "LW", "RW", "ST"];
	return positions[Math.floor(Math.random() * positions.length)];
}

function generateWage() {
	const iterationSize = 10000;
	const minWage = 10000;
	const maxWage = 2000000;
	return minWage + iterationSize * Math.floor(Math.random() * ((maxWage - minWage) / iterationSize));
}

function generateValue() {
	const iterationSize = 100000;
	const minValue = 100000;
	const maxValue = 200000000;
	return minValue + iterationSize * Math.floor(Math.random() * ((maxValue - minValue) / iterationSize));
}

module.exports = { getAgent, getPlayer, fetchClubs };
