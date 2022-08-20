import { Component } from "react";
import "./PlayerForm.scss";
import POSITIONS from "../../constants/positions";
import FormItem from "../FormItem/FormItem";
import Loader from "../Loader/Loader";
import { apiGetAgents } from "../../api/agents";
import { Player } from "../../api/players";

interface Agent {
	id: number;
	name: string;
	email: string;
	phone: string;
}

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

	onFormItemChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value.trim() });
	};

	render() {
		if (this.state.isLoading) return <Loader />;
		const { first_name, last_name, age, nationality, club, position, wage, value, clubs_history, agent_id } = this.state;
		return (
			<div className="add-player-form">
				<h3>{this.props.player ? `Edit Player #${this.props.player.id}` : "New Player"}</h3>
				<form onSubmit={this.onFormSubmit}>
					<FormItem initialValue={first_name} name="first_name" parentOnChange={this.onFormItemChange} labelText="First Name" required={true} minLength={2} />
					<FormItem initialValue={last_name} name="last_name" parentOnChange={this.onFormItemChange} labelText="Last Name" required={true} minLength={2} />
					<FormItem initialValue={age} name="age" parentOnChange={this.onFormItemChange} labelText="Age" type="number" required={true} min={17} max={39} />
					<FormItem
						initialValue={nationality}
						name="nationality"
						parentOnChange={this.onFormItemChange}
						labelText="Nationality"
						required={true}
						minLength={3}
					/>
					<FormItem initialValue={club} name="club" parentOnChange={this.onFormItemChange} labelText="Club" required={true} minLength={3} />
					<FormItem
						initialValue={position}
						name="position"
						parentOnChange={this.onFormItemChange}
						isSelect={true}
						labelText="Position"
						required={true}
						selectOptions={POSITIONS.map((pos) => (
							<option key={pos} value={pos}>
								{pos}
							</option>
						))}
					/>
					<FormItem
						initialValue={wage}
						name="wage"
						parentOnChange={this.onFormItemChange}
						labelText="Wage"
						type="number"
						required={true}
						min={10000}
						max={2000000}
					/>
					<FormItem
						initialValue={value}
						name="value"
						parentOnChange={this.onFormItemChange}
						labelText="Value"
						type="number"
						required={true}
						min={100000}
						max={200000000}
					/>
					<FormItem
						initialValue={clubs_history}
						name="clubs_history"
						parentOnChange={this.onFormItemChange}
						labelText="Clubs History"
						required={true}
						minLength={3}
					/>
					<FormItem
						initialValue={agent_id}
						name="agent_id"
						parentOnChange={this.onFormItemChange}
						isSelect={true}
						labelText="Agent"
						required={true}
						selectOptions={this.state.agents.map((agent) => (
							<option key={agent.id} value={agent.id}>
								{`${agent.name} (${agent.id})`}
							</option>
						))}
					/>
					<button type="submit">{this.props.player ? "Edit player" : "Add player"}</button>
				</form>
			</div>
		);
	}
}

export default PlayerForm;
