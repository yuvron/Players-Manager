import { useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import AddButton from "../../components/AddButton/AddButton";
import Modal from "../../components/Modal/Modal";
import PlayerForm from "../../components/PlayerForm/PlayerForm";
import { Player } from "../../api/players";
import { usePlayers } from "../../context/PlayersContext";
import "./PlayersPage.scss";

const PlayersPage: React.FC = () => {
	const { createPlayer, updatePlayer } = usePlayers();
	const [isAdding, setIsAdding] = useState(false);
	const [editedPlayer, setEditedPlayer] = useState<Player | undefined>(undefined);

	return (
		<div className="players-page">
			<AddButton text="Add Player" handleClick={() => setIsAdding(true)} />
			<DataTable dataType="players" handleEdit={setEditedPlayer} />
			{isAdding && (
				<Modal handleClose={() => setIsAdding(false)}>
					<PlayerForm
						handleSubmit={async (player: Player) => {
							await createPlayer(player);
							setIsAdding(false);
						}}
					/>
				</Modal>
			)}
			{editedPlayer && (
				<Modal handleClose={() => setEditedPlayer(undefined)}>
					<PlayerForm
						handleSubmit={async (player: Player) => {
							await updatePlayer(player.id, player);
							setEditedPlayer(undefined);
						}}
						player={editedPlayer}
					/>
				</Modal>
			)}
		</div>
	);
};

export default PlayersPage;
