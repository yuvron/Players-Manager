import { Component } from "react";
import axios from "axios";
import "./PlayersTable.scss";

interface Player {
	id: number;
	first_name: string;
	last_name: string;
	age: number;
	nationality: string;
	club: string;
	position: string;
	wage: number;
	value: number;
	clubs_history: string[];
	agent_id: number;
}

interface PlayersTableState {
	players: Player[];
}

class PlayersTable extends Component {
	state: PlayersTableState = { players: [] };

	componentDidMount() {
		axios
			.get("/api/players")
			.then((response) => {
				this.setState({
					players: response.data,
				});
			})
			.catch((err) => {
				if (err.response) console.log(err.response);
				else console.log(err);
			});
	}

	renderPlayers() {
		return this.state.players.map((player) => {
			return (
				<tr key={player.id}>
					{Object.entries(player).map(([key, value]) => {
						let formattedValue = value;
						if (typeof value === "number") formattedValue = value.toLocaleString();
						if (Array.isArray(value)) formattedValue = value.join(", ");
						return (
							<td key={key} className={`user-${key}`}>
								{formattedValue}
							</td>
						);
					})}
				</tr>
			);
		});
	}

	renderHeaders() {
		if (this.state.players[0]) {
			return Object.keys(this.state.players[0]).map((key) => {
				let formattedKey = key.replaceAll("_", " ");
				return <th key={key}>{formattedKey}</th>;
			});
		} else return [];
	}

	render() {
		return (
			<div className="users-table">
				<table>
					<thead>
						<tr>{this.renderHeaders()}</tr>
					</thead>
					<tbody>{this.renderPlayers()}</tbody>
				</table>
			</div>
		);
	}
}

export default PlayersTable;
