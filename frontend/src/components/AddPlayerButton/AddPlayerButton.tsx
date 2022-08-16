import { Component } from "react";
import "./AddPlayerButton.scss";

interface AddPlayerButtonProps {
	handleClick: () => void;
}

class AddPlayerButton extends Component<AddPlayerButtonProps> {
	render() {
		return (
			<>
				<button onClick={this.props.handleClick} className="add-player-button">
					<i className="fa-solid fa-circle-plus"></i> Add Player
				</button>
			</>
		);
	}
}

export default AddPlayerButton;
