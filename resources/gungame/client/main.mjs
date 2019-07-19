import alt from 'alt';
import game from 'natives';

let cefOverlay;

alt.onServer('playerReady', () =>
{
	cefOverlay = new alt.WebView('http://resources/gungame/client/cef/overlay/overlay.html');
	cefOverlay.on('AltInWindow', () =>
	{
		alt.setTimeout(() => cefOverlay.emit('ResetPlayerData'), 1500);
	});
});

alt.onServer('removeAllPedWeapons', () =>
{
	const player = alt.Player.local.scriptID;
	game.removeAllPedWeapons(player, true);
});

alt.onServer('updatePoints', (data) =>
{
	cefOverlay.emit('UpdatePlayerData', data);
});