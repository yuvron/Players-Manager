import { useState } from "react";
import PlayersTable from "../../components/PlayersTable/PlayersTable";
import AddPlayerButton from "../../components/AddPlayerButton/AddPlayerButton";
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
			<AddPlayerButton handleClick={() => setIsAdding(true)} />
			<PlayersTable handleEdit={setEditedPlayer} />
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
