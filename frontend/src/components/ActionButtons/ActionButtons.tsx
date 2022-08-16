import "./ActionButtons.scss";

const ActionButtons: React.FC = () => {
	return (
		<div className="action-buttons">
			<button>
				<i className="edit-button fa-solid fa-pen-to-square"></i>
			</button>
			<button>
				<i className="delete-button fa-solid fa-trash-can"></i>
			</button>
		</div>
	);
};

export default ActionButtons;
