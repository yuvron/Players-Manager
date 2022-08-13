import { Component } from "react";
import axios from "axios";
import "./AddPlayerForm.scss";
import POSITIONS from "../../constants/positions";
import FormItem from "../FormItem/FormItem";

interface Agent {
	id: number;
	name: string;
	email: string;
	phone: string;
}

interface AddPlayerFormState {
	agents: Agent[];
	firstName?: string;
	lastName?: string;
	age?: number;
	nationality?: string;
	club?: string;
	position?: string;
	wage?: number;
	value?: number;
	agent?: number;
}

class AddPlayerForm extends Component {
	state: AddPlayerFormState = { agents: [] };

	componentDidMount() {
		axios
			.get("/api/agents")
			.then((response) => {
				this.setState({
					agents: response.data,
				});
			})
			.catch((err) => {
				if (err.response && err.response.status === 500) location.reload();
				else console.log(err);
			});
	}

	onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	onFormItemChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	renderAgents() {
		return [];
	}

	render() {
		return (
			<div className="add-player-form">
				<h3>New Player</h3>
				<form onSubmit={this.onFormSubmit}>
					<FormItem
						name="firstName"
						onChange={this.onFormItemChange}
						isSelect={false}
						labelText="First Name"
						type="text"
						required={true}
						minLength={2}
					/>
					<FormItem
						name="lastName"
						onChange={this.onFormItemChange}
						isSelect={false}
						labelText="Last Name"
						type="text"
						required={true}
						minLength={2}
					/>
					<FormItem name="age" onChange={this.onFormItemChange} isSelect={false} labelText="Age" type="number" required={true} min={17} max={39} />
					<FormItem
						name="nationality"
						onChange={this.onFormItemChange}
						isSelect={false}
						labelText="Nationality"
						type="text"
						required={true}
						minLength={3}
					/>
					<FormItem name="club" onChange={this.onFormItemChange} isSelect={false} labelText="Club" type="text" required={true} minLength={3} />
					<FormItem
						name="position"
						onChange={this.onFormItemChange}
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
						name="wage"
						onChange={this.onFormItemChange}
						isSelect={false}
						labelText="Wage"
						type="number"
						required={true}
						min={10000}
						max={2000000}
					/>
					<FormItem
						name="value"
						onChange={this.onFormItemChange}
						isSelect={false}
						labelText="Value"
						type="number"
						required={true}
						min={100000}
						max={200000000}
					/>
					<FormItem
						name="agent"
						onChange={this.onFormItemChange}
						isSelect={true}
						labelText="Agent"
						required={true}
						selectOptions={this.state.agents.map((agent) => (
							<option key={agent.id} value={agent.id}>
								{`${agent.name} (${agent.id})`}
							</option>
						))}
					/>
					<button type="submit">Add Player</button>
				</form>
			</div>
		);
	}
}

export default AddPlayerForm;
