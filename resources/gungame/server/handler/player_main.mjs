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
			alt.emitClient(player, 'playerReady');
		});

		alt.on('playerDeath', (player, killer, weapon) =>
		{
			if(player !== killer)
			{
				killer.data.stage++;
				killer.data.points++;
				if(killer.data.stage === matchData.Weapons.length - 1)
				{
					killer.data.level++;
					killer.data.stage = 0;
				}
				alt.emitClient(killer, 'updatePoints', killer.data);
				alt.emitClient(killer, 'removeAllPedWeapons');
				alt.emit('giveWeaponToPlayer', killer);
			}
			else
			{
				player.data.stage--;
				player.data.points--;
				if(player.data.stage < 0)
				{
					player.data.stage = matchData.Weapons.length - 1;
					player.data.level--;
				}
				if(player.data.level < 0)
				{
					player.data.level = 0;
					player.data.stage = 0;
				}
				alt.emitClient(player, 'updatePoints', player.data);
			}
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