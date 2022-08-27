import "./AddButton.scss";
import { AiFillPlusCircle } from "react-icons/ai";

interface AddButtonProps {
	text: string;
	handleClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ text, handleClick }) => {
	return (
		<>
			<button onClick={handleClick} className="add-button">
				<AiFillPlusCircle />
				{text}
			</button>
		</>
	);
};

export default AddButton;
