import React, { Component } from "react";
import "./AddPlayerButton.scss";

class AddPlayerButton extends Component {
	render() {
		return (
			<>
				<button className="add-player-button">
					<i className="fa-solid fa-circle-plus"></i> Add Player
				</button>
			</>
		);
	}
}

export default AddPlayerButton;
