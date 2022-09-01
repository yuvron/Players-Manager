import { Component } from "react";
import "./AgentForm.scss";
import Loader from "../Loader/Loader";
import { Agent } from "../../api/agents";

interface AgentFormProps {
	handleSubmit: (agent: Agent) => Promise<void>;
	agent?: Agent;
}

interface AgentFormState {
	isLoading: boolean;
	name: string;
	email: string;
	phone: string;
}

class AgentForm extends Component<AgentFormProps> {
	state: AgentFormState = {
		isLoading: false,
		name: this.props.agent ? this.props.agent.name : "",
		email: this.props.agent ? this.props.agent.email : "",
		phone: this.props.agent ? this.props.agent.phone : "",
	};

	onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { name, email, phone } = this.state;
		if (name && email && phone) {
			const agent: Agent = {
				id: this.props.agent ? this.props.agent.id : 0,
				name,
				email,
				phone,
			};
			this.props.handleSubmit(agent).then(() => this.setState({ isLoading: false }));
			this.setState({ isLoading: true });
		}
	};

	onInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value.trim() });
	};

	render() {
		if (this.state.isLoading) return <Loader />;
		const { name, email, phone } = this.state;
		return (
			<div className="agent-form">
				<h3>{this.props.agent ? `Edit Agent #${this.props.agent.id}` : "New Agent"}</h3>
				<form onSubmit={this.onFormSubmit}>
					<div>
						<label htmlFor="name">Name</label>
						<input name="name" value={name} onChange={this.onInputChange} type="text" required minLength={2} />
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input name="email" value={email} onChange={this.onInputChange} type="email" required />
					</div>
					<div>
						<label htmlFor="phone">Phone (+44-123-456-789)</label>
						<input
							name="phone"
							value={phone}
							onChange={this.onInputChange}
							type="tel"
							required
							pattern="[+]([0-9]{3}|[0-9]{2})-[0-9]{3}-[0-9]{3}-[0-9]{3}"
						/>
					</div>
					<button type="submit">{this.props.agent ? "Edit agent" : "Add agent"}</button>
				</form>
			</div>
		);
	}
}

export default AgentForm;
