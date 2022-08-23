import { useState } from "react";
import PlayersTable from "../../components/PlayersTable/PlayersTable";
import AddPlayerButton from "../../components/AddPlayerButton/AddPlayerButton";
import Modal from "../../components/Modal/Modal";
import PlayerForm from "../../components/PlayerForm/PlayerForm";
import { Player } from "../../api/players";
import usePlayers from "../../hooks/usePlayers";
import "./PlayersPage.scss";

const PlayersPage: React.FC = () => {
	const [players, createPlayer, updatePlayer, deletePlayer] = usePlayers();
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedPlayer, setEditedPlayer] = useState<Player | undefined>(undefined);

	return (
		<div className="players-page">
			<AddPlayerButton handleClick={() => setIsAdding(true)} />
			<PlayersTable
				players={players}
				handleEdit={(player: Player) => {
					setIsEditing(true);
					setEditedPlayer(player);
				}}
				handleDelete={deletePlayer}
			/>
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
			{isEditing && (
				<Modal handleClose={() => setIsEditing(false)}>
					<PlayerForm
						handleSubmit={async (player: Player) => {
							await updatePlayer(player.id, player);
							setIsEditing(false);
						}}
						player={editedPlayer}
					/>
				</Modal>
			)}
		</div>
	);
};

export default PlayersPage;
