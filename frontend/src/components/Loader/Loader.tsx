import { Component } from "react";
import "./Loader.scss";

class Loader extends Component {
	render() {
		return (
			<div className="loader">
				<div className="loader-content"></div>
			</div>
		);
	}
}

export default Loader;
