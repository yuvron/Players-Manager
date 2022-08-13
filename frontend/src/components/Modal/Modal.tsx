import { Component } from "react";
import "./Modal.scss";

interface ModalProps {
	handleClose: () => void;
	children: React.ReactNode;
}

class Modal extends Component<ModalProps> {
	render() {
		return (
			<div className="modal" onClick={this.props.handleClose}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<i onClick={this.props.handleClose} className="fa-solid fa-xmark"></i>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Modal;
