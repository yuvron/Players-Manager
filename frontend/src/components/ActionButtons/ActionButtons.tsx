import "./ActionButtons.scss";

interface ActionButtonsProps {
	onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDelete }) => {
	return (
		<div className="action-buttons">
			<button>
				<i className="edit-button fa-solid fa-pen-to-square"></i>
			</button>
			<button onClick={onDelete}>
				<i className="delete-button fa-solid fa-trash-can"></i>
			</button>
		</div>
	);
};

export default ActionButtons;
