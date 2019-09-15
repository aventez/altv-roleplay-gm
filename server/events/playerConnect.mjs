import * as alt from 'alt';
import * as basicPlayer from '../basic/player.mjs';
import { LoginCamPoint } from '../config/points.mjs';

alt.on('playerConnect', player => {
	alt.log(`[join] ${player.name} joined to server.`);

	basicPlayer.setupPlayerFunctions(player);

	//Show login dialog
	player.pos = LoginCamPoint;
	player.dimension = 0;
	player.showLogin(LoginCamPoint);
	player.screenBlurIn(0);
	player.screenFadeOut(0);
	player.screenFadeIn(1800);
});