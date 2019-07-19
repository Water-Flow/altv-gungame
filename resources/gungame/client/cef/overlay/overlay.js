/* eslint-disable no-undef */
function ResetPlayerData()
{
	document.getElementById('level').innerHTML = '0';
	document.getElementById('stage').innerHTML = '0';
	document.getElementById('points').innerHTML = '0';
}

function UpdatePlayerData(data)
{
	if(data.stage > parseInt(document.getElementById('stage').innerHTML) && document.getElementById('level').innerHTML == data.level)
		document.getElementById('powerup').play();
	else if(data.stage < parseInt(document.getElementById('stage').innerHTML) && document.getElementById('level').innerHTML == data.level)
		document.getElementById('powerdown').play();

	document.getElementById('level').innerHTML = data.level;
	document.getElementById('stage').innerHTML = data.stage;
	document.getElementById('points').innerHTML = data.points;
}

if('alt' in window)
{
	alt.on('ResetPlayerData', ResetPlayerData);
	alt.on('UpdatePlayerData', UpdatePlayerData);
	alt.emit('AltInWindow');
}