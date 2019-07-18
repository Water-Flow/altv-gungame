import alt from 'alt';

export class Player
{
	constructor()
	{
		const matchData = {
			'Spawn': [
				{ 'x':1737.2000732421875, 'y':3324.74169921875, 'z':41.22347640991211 },
				{ 'x':1737.1566162109375, 'y':3324.612060546875, 'z':41.22023391723633 },
				{ 'x':1737.2000732421875, 'y':3324.74169921875, 'z':41.22347640991211 },
				{ 'x':1723.3287353515625, 'y':3296.080078125, 'z':41.223506927490234 },
				{ 'x':1770.5704345703125, 'y':3300.421142578125, 'z':41.1893196105957 },
				{ 'x':1723.3486328125, 'y':3225.481201171875, 'z':41.93886947631836 },
				{ 'x':1711.817138671875, 'y':3282.594482421875, 'z':41.639774322509766 },
				{ 'x':1693.1322021484375, 'y':3294.566650390625, 'z':41.14654541015625 },
				{ 'x':1701.5396728515625, 'y':3291.637451171875, 'z':48.92207717895508 },
			],
			'Weapons': [
				{ 'id':324215364, 'ammo':100 },
				{ 'id':736523883, 'ammo':100 },
				{ 'id':-1357824103, 'ammo':15 },
				{ 'id':487013001, 'ammo':20 },
				{ 'id':1141786504, 'ammo':1 },
				{ 'id':487013001, 'ammo':20 },
				{ 'id':-1813897027, 'ammo':10 },
				{ 'id':-1121678507, 'ammo':100 },
				{ 'id':-1045183535, 'ammo':50 },
				{ 'id':-1169823560, 'ammo':5 },
				{ 'id':-1660422300, 'ammo':100 },
				{ 'id':-1568386805, 'ammo':25 },
				{ 'id':1119849093, 'ammo':15 },
				{ 'id':3686625920, 'ammo':50 },
				{ 'id':-598887786, 'ammo':30 },
				{ 'id':1737195953, 'ammo':1 },
				{ 'id':615608432, 'ammo':10 },
				{ 'id':-1716189206, 'ammo':1 },
			],
		};

		alt.on('playerConnect', (player) =>
		{
			if(player.level === undefined)
				player.level = 0;
			alt.emit('spawnPlayer', player);
		});

		alt.on('playerDeath', (player, killer, weapon) =>
		{
			killer.level += 1;
			if(killer.level === matchData.Weapons.length - 1)
				killer.level = 0;
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
			player.giveWeapon(matchData.Weapons[player.level].id, matchData.Weapons[player.level].ammo, true);
		});
	}
}