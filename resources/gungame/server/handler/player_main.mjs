import alt from 'alt';
import fs from 'fs';

export class Player
{
	constructor()
	{
		const matchData = {};
		matchData.Spawn = JSON.parse(fs.readFileSync('./resources/gungame/server/config/spawns.json', 'utf8'));
		matchData.Weapons = JSON.parse(fs.readFileSync('./resources/gungame/server/config/weapons.json', 'utf8'));

		alt.on('playerConnect', (player) =>
		{
			if(player.data === undefined)
				player.data = JSON.parse(fs.readFileSync('./resources/gungame/server/config/player.json', 'utf8'));
			alt.emit('spawnPlayer', player);
		});

		alt.on('playerDeath', (player, killer, weapon) =>
		{
			killer.data.stage += 1;
			if(killer.data.stage === matchData.Weapons.length - 1)
			{
				killer.data.level += 1;
				killer.data.stage = 0;
			}
			alt.emitClient(killer, 'removeAllPedWeapons');
			alt.emit('giveWeaponToPlayer', killer);
			setTimeout(() =>
			{
				alt.emitClient(player, 'removeAllPedWeapons');
				alt.emit('spawnPlayer', player);
			}, 5000);
		});

		alt.on('spawnPlayer', (player) =>
		{
			player.model = 'mp_m_freemode_01';
			const randomSpawn = Math.floor(Math.random() * matchData.Spawn.length);
			player.spawn(matchData.Spawn[randomSpawn].x, matchData.Spawn[randomSpawn].y, matchData.Spawn[randomSpawn].z, 0);
			alt.emit('giveWeaponToPlayer', player);
		});

		alt.on('giveWeaponToPlayer', (player) =>
		{
			player.giveWeapon(matchData.Weapons[player.data.stage].id, matchData.Weapons[player.data.stage].ammo, true);
		});
	}
}