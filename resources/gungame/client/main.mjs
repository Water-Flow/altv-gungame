import alt from 'alt';
import game from 'natives';

alt.onServer('removeAllPedWeapons', () =>
{
	const player = alt.getLocalPlayer().scriptID;
	game.removeAllPedWeapons(player, true);
});