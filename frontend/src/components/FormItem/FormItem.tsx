import { Component } from "react";
import "./FormItem.scss";

interface FromItemProps {
	parentOnChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	labelText: string;
	initialValue?: string | number;
	required?: boolean;
	type?: string;
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	isSelect?: boolean;
	selectOptions?: React.ReactNode[];
}

interface FormItemState {
	value: string | number;
}

class FormItem extends Component<FromItemProps> {
	state: FormItemState = { value: this.props.initialValue || "" };

	onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ value: e.target.value.trim() });
		this.props.parentOnChange(e);
	};

	renderInput() {
		const inputAttributes: { [key: string]: string | number | boolean } = { name: this.props.name };
		if (this.props.required) inputAttributes.required = this.props.required;
		if (this.props.type) inputAttributes.type = this.props.type;
		if (this.props.min) inputAttributes.min = this.props.min;
		if (this.props.max) inputAttributes.max = this.props.max;
		if (this.props.minLength) inputAttributes.minLength = this.props.minLength;
		if (this.props.maxLength) inputAttributes.maxLength = this.props.maxLength;
		return <input value={this.state.value} onChange={this.onChange} {...inputAttributes} />;
	}

	renderSelect() {
		const inputAttributes: { [key: string]: string | number | boolean } = { name: this.props.name };
		if (this.props.required) inputAttributes.required = this.props.required;
		return (
			<select value={this.state.value} onChange={this.onChange} {...inputAttributes}>
				{this.props.selectOptions}
			</select>
		);
	}

	render() {
		return (
			<div className="form-item">
				<label htmlFor={this.props.name}>{this.props.labelText}</label>
				{this.props.isSelect || this.renderInput()}
				{this.props.isSelect && this.renderSelect()}
			</div>
		);
	}
}

export default FormItem;
