import { Component } from "react";
import "./FormItem.scss";

interface FromItemProps {
	onChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	isSelect: boolean;
	labelText: string;
	type?: string;
	required: boolean;
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	selectOptions?: React.ReactNode[];
}

class FormItem extends Component<FromItemProps> {
	renderInput() {
		const inputAttributes: { [key: string]: string | number } = {};
		if (this.props.min) inputAttributes.min = this.props.min;
		if (this.props.max) inputAttributes.max = this.props.max;
		if (this.props.minLength) inputAttributes.minLength = this.props.minLength;
		if (this.props.maxLength) inputAttributes.maxLength = this.props.maxLength;
		return <input name={this.props.name} onChange={this.props.onChange} type="text" {...inputAttributes} required={this.props.required} />;
	}

	renderSelect() {
		return (
			<select name={this.props.name} onChange={this.props.onChange} required={this.props.required}>
				{this.props.selectOptions}
			</select>
		);
	}

	render() {
		return (
			<div className="form-item">
				<label htmlFor="">{this.props.labelText}</label>
				{this.props.isSelect || this.renderInput()}
				{this.props.isSelect && this.renderSelect()}
			</div>
		);
	}
}

export default FormItem;
