const Key =
{
	'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72,
	'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80,
	'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88,
	'Y': 89, 'Z': 90, 'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116,
	'F6': 117, 'F7': 118, 'F8': 119, 'F10': 120, 'F11': 121, 'F12': 122
};

export class Keys
{
	constructor()
	{
		alt.on('keyup', key =>
		{
			const player = alt.getLocalPlayer();
			if(key === Key.L)
				alt.log(JSON.stringify(player.pos));
		});
	}
}