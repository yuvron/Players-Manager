import "./ActionButtons.scss";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

interface ActionButtonsProps {
	onEdit: () => void;
	onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDelete, onEdit }) => {
	return (
		<td>
			<div className="action-buttons">
				<button onClick={onEdit}>
					<FaEdit className="edit-button" />
				</button>
				<button onClick={onDelete}>
					<FaTrashAlt className="delete-button" />
				</button>
			</div>
		</td>
	);
};

export default ActionButtons;
