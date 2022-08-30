import { Component } from "react";
import "./AgentForm.scss";
import FormItem from "../FormItem/FormItem";
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

	onFormItemChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value.trim() });
	};

	render() {
		if (this.state.isLoading) return <Loader />;
		const { name, email, phone } = this.state;
		return (
			<div className="add-player-form">
				<h3>{this.props.agent ? `Edit Agent #${this.props.agent.id}` : "New Agent"}</h3>
				<form onSubmit={this.onFormSubmit}>
					<FormItem initialValue={name} name="name" parentOnChange={this.onFormItemChange} labelText="Name" required={true} minLength={2} />
					<FormItem initialValue={email} type="email" name="email" parentOnChange={this.onFormItemChange} labelText="Email" required={true} minLength={2} />
					<FormItem initialValue={phone} name="phone" parentOnChange={this.onFormItemChange} labelText="Phone" required={true} />
					<button type="submit">{this.props.agent ? "Edit agent" : "Add agent"}</button>
				</form>
			</div>
		);
	}
}

export default AgentForm;
