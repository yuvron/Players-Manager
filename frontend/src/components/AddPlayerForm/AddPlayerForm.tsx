import { Component } from "react";
import axios from "axios";
import "./AddPlayerForm.scss";
import POSITIONS from "../../constants/positions";
import FormItem from "../FormItem/FormItem";
import Loader from "../Loader/Loader";

interface Agent {
	id: number;
	name: string;
	email: string;
	phone: string;
}

interface AddPlayerFormProps {
	handlePlayerAdded: () => void;
}

interface AddPlayerFormState {
	isLoading: boolean;
	agents: Agent[];
	firstName?: string;
	lastName?: string;
	age?: number;
	nationality?: string;
	club?: string;
	position?: string;
	wage?: number;
	value?: number;
	history?: string;
	agent?: number;
}

class AddPlayerForm extends Component<AddPlayerFormProps> {
	state: AddPlayerFormState = { isLoading: false, agents: [], position: POSITIONS[0], agent: 1 };

	componentDidMount() {
		axios
			.get("/api/agents")
			.then((response) => {
				this.setState({ isLoading: false });
				this.setState({
					agents: response.data,
					agent: response.data[0].id,
				});
			})
			.catch((err) => {
				this.setState({ isLoading: false });
				if (err.response && err.response.status === 500) location.reload();
				else console.log(err);
			});
		this.setState({ isLoading: true });
	}

	onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.post("/api/players", {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				age: +this.state.age!,
				nationality: this.state.nationality,
				club: this.state.club,
				position: this.state.position,
				wage: +this.state.wage!,
				value: +this.state.value!,
				history: this.state
					.history!.split(",")
					.map((c) => c.trim())
					.filter((c) => c !== ""),
				agent: this.state.agent,
			})
			.then((response) => {
				this.setState({ isLoading: false });
				console.log(response.data);
				this.props.handlePlayerAdded();
			})
			.catch((err) => {
				this.setState({ isLoading: false });
				if (err.response) console.log(err.response);
				else console.log(err);
			});
		this.setState({ isLoading: true });
	};

	onFormItemChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		if (this.state.isLoading) return <Loader />;
		return (
			<div className="add-player-form">
				<h3>New Player</h3>
				<form onSubmit={this.onFormSubmit}>
					<FormItem name="firstName" parentOnChange={this.onFormItemChange} labelText="First Name" required={true} minLength={2} />
					<FormItem name="lastName" parentOnChange={this.onFormItemChange} labelText="Last Name" required={true} minLength={2} />
					<FormItem name="age" parentOnChange={this.onFormItemChange} labelText="Age" type="number" required={true} min={17} max={39} />
					<FormItem name="nationality" parentOnChange={this.onFormItemChange} labelText="Nationality" required={true} minLength={3} />
					<FormItem name="club" parentOnChange={this.onFormItemChange} labelText="Club" required={true} minLength={3} />
					<FormItem
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
					<FormItem name="wage" parentOnChange={this.onFormItemChange} labelText="Wage" type="number" required={true} min={10000} max={2000000} />
					<FormItem name="value" parentOnChange={this.onFormItemChange} labelText="Value" type="number" required={true} min={100000} max={200000000} />
					<FormItem name="history" parentOnChange={this.onFormItemChange} labelText="Clubs History" required={true} minLength={3} />
					<FormItem
						name="agent"
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
					<button type="submit">Add Player</button>
				</form>
			</div>
		);
	}
}

export default AddPlayerForm;
