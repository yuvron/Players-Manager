import { Component } from "react";
import "./PlayerForm.scss";
import POSITIONS from "../../constants/positions";
import Loader from "../Loader/Loader";
import { Agent, apiGetAgents } from "../../api/agents";
import { Player } from "../../api/players";

interface PlayerFormProps {
	handleSubmit: (player: Player) => Promise<void>;
	player?: Player;
}

interface PlayerFormState {
	isLoading: boolean;
	agents: Agent[];
	first_name: string;
	last_name: string;
	age: number;
	nationality: string;
	club: string;
	position: string;
	wage: number;
	value: number;
	clubs_history: string;
	agent_id: number;
}

class PlayerForm extends Component<PlayerFormProps> {
	state: PlayerFormState = {
		isLoading: false,
		agents: [],
		first_name: this.props.player ? this.props.player.first_name : "",
		last_name: this.props.player ? this.props.player.last_name : "",
		age: this.props.player ? this.props.player.age : 17,
		nationality: this.props.player ? this.props.player.nationality : "",
		club: this.props.player ? this.props.player.club : "",
		position: this.props.player ? this.props.player.position : POSITIONS[0],
		wage: this.props.player ? this.props.player.wage : 10000,
		value: this.props.player ? this.props.player.value : 100000,
		clubs_history: this.props.player ? this.props.player.clubs_history.join(", ") : "",
		agent_id: this.props.player ? this.props.player.agent_id : 1,
	};

	componentDidMount() {
		apiGetAgents().then((agents) => {
			this.setState({
				isLoading: false,
				agents: agents,
				agent: agents[0].id,
			});
		});
		this.setState({ isLoading: true });
	}

	onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id } = this.state;
		if (first_name && last_name && age && nationality && club && position && wage && value && clubs_history && agent_id) {
			const player: Player = {
				id: this.props.player ? this.props.player.id : 0,
				first_name,
				last_name,
				age,
				nationality,
				club,
				position,
				wage,
				value,
				clubs_history: clubs_history!
					.split(",")
					.map((c) => c.trim())
					.filter((c) => c !== ""),
				agent_id,
			};
			this.props.handleSubmit(player).then(() => this.setState({ isLoading: false }));
			this.setState({ isLoading: true });
		}
	};

	onInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value.trim() });
	};

	render() {
		if (this.state.isLoading) return <Loader />;
		const { first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id, agents } = this.state;
		return (
			<div className="player-form">
				<h3>{this.props.player ? `Edit Player #${this.props.player.id}` : "New Player"}</h3>
				<form onSubmit={this.onFormSubmit}>
					<div>
						<label htmlFor="first_name">First Name</label>
						<input name="first_name" value={first_name} onChange={this.onInputChange} required minLength={2} />
					</div>
					<div>
						<label htmlFor="last_name">Last Name</label>
						<input name="last_name" value={last_name} onChange={this.onInputChange} required minLength={2} />
					</div>
					<div>
						<label htmlFor="age">Age</label>
						<input name="age" type="number" value={age} onChange={this.onInputChange} required min={17} max={39} />
					</div>
					<div>
						<label htmlFor="nationality">Nationality</label>
						<input name="nationality" value={nationality} onChange={this.onInputChange} required minLength={3} />
					</div>
					<div>
						<label htmlFor="club">Club</label>
						<input name="club" value={club} onChange={this.onInputChange} required minLength={3} />
					</div>
					<div>
						<label htmlFor="position">Position</label>
						<select name="position" value={position} onChange={this.onInputChange} required>
							{POSITIONS.map((pos) => (
								<option key={pos} value={pos}>
									{pos}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="wage">Wage</label>
						<input name="wage" type="number" value={wage} onChange={this.onInputChange} required min={10000} max={2000000} />
					</div>
					<div>
						<label htmlFor="value">Value</label>
						<input name="value" type="number" value={value} onChange={this.onInputChange} required min={100000} max={200000000} />
					</div>
					<div>
						<label htmlFor="clubs_history">Clubs History (separate with commas)</label>
						<input name="clubs_history" value={clubs_history} onChange={this.onInputChange} required minLength={3} />
					</div>
					<div>
						<label htmlFor="agent_id">Agent</label>
						<select name="agent_id" value={agent_id} onChange={this.onInputChange} required>
							{agents.map((agent) => (
								<option key={agent.id} value={agent.id}>
									{`${agent.name} (${agent.id})`}
								</option>
							))}
						</select>
					</div>
					<button type="submit">{this.props.player ? "Edit player" : "Add player"}</button>
				</form>
			</div>
		);
	}
}

export default PlayerForm;
