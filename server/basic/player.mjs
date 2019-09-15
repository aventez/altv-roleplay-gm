import * as alt from 'alt';

export function setupPlayerFunctions(player) {
	player.showLogin = (regCamCoord, regCamPointAtCoord) => {
        alt.emitClient(player, 'login:ShowDialog', regCamCoord, regCamPointAtCoord);
    };

    player.showLoginError = (message) => {
    	alt.emitClient(player, 'login:ShowError', message);
    };

    player.closeLogin = () => {
		alt.emitClient(player, 'login:CloseDialog');
    };

    player.showChoose = (regCamCoord) => {
    	alt.emitClient(player, 'choose:ShowDialog', regCamCoord);
    };

    player.closeChoose = () => {
    	alt.emitClient(player, 'choose:CloseDialog');
    }

    player.addCharacter = (id, name) => {
        alt.emitClient(player, 'choose:AddCharacter', id, name);
    }

    //Shaders
    player.screenFadeOutFadeIn = (fadeInOutMS, timeoutMS) => {
        alt.emitClient(player, 'shaders:FadeOutFadeIn', fadeInOutMS, timeoutMS);
    };

    player.screenFadeOut = timeInMS => {
        alt.emitClient(player, 'shaders:FadeOut', timeInMS);
    };

    player.screenFadeIn = timeInMS => {
        alt.emitClient(player, 'shaders:FadeIn', timeInMS);
    };

    player.screenBlurOut = timeInMS => {
        alt.emitClient(player, 'shaders:BlurOut', timeInMS);
    };

    player.screenBlurIn = timeInMS => {
        alt.emitClient(player, 'shaders:BlurIn', timeInMS);
    };

    //Others

    player.syncMoney = () => {
        player.setSyncedMeta('bank', player.data.bank);
        player.setSyncedMeta('cash', player.data.cash);
    };
}