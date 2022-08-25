import { Component } from "react";
import "./AddPlayerButton.scss";
import { AiFillPlusCircle } from "react-icons/ai";

interface AddPlayerButtonProps {
	handleClick: () => void;
}

class AddPlayerButton extends Component<AddPlayerButtonProps> {
	render() {
		return (
			<>
				<button onClick={this.props.handleClick} className="add-player-button">
					<AiFillPlusCircle />
					Add Player
				</button>
			</>
		);
	}
}

export default AddPlayerButton;
