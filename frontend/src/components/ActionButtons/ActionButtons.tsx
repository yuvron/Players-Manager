import "./ActionButtons.scss";

interface ActionButtonsProps {
	onEdit: () => void;
	onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDelete, onEdit }) => {
	return (
		<div className="action-buttons">
			<button onClick={onEdit}>
				<i className="edit-button fa-solid fa-pen-to-square"></i>
			</button>
			<button onClick={onDelete}>
				<i className="delete-button fa-solid fa-trash-can"></i>
			</button>
		</div>
	);
};

export default ActionButtons;
