import * as alt from 'alt';

import SQL from '../../../postgres-wrapper/database.mjs';
import * as encryption from '../basic/encrypt.mjs';

import { LoginCamPoint } from '../config/points.mjs';

// Load the database handler.
const db = new SQL();

export function checkData(player, username, password) {
	if (player.guid !== undefined) return;

	if(username === undefined || password === undefined) {
		return;
	}

	alt.log(`[log] ${player.name} trying to login as ${username}`);

    db.fetchData('username', username, 'Account', data => {
        if (data === undefined) {
            player.showLoginError('Nie znaleziono takiego konta.');
            return;
        }

        if(!encryption.verify(password, data.password)) {
        	player.showLoginError('Podano błędne dane.');
        } else {
        	finishLoginProcess(player, data.id);
        }
    });
}

export function ready(player) {
    fetchPlayerCharacters(player);
}

export function pickCharacter(player, uid) {
    db.fetchByIds(uid, 'Character', results => {
        if(results === undefined) {
            return false;
        }

        const data = {
            id: player.guid,
            name: results[0].name,
            model: 'mp_m_freemode_01',
            health: 100,
            cash: results[0].cash,
            bank: results[0].bank
        };

        player.data = data;

        player.syncMoney();
        player.setSyncedMeta('name', data.name);

        player.closeChoose();
        player.screenBlurOut(0);
        player.spawn(808.0, -268.20, 65.94, 1);
        player.model = data.model;
        player.dimension = 1;

        alt.emitClient(player, 'hud:ShowDialog');
    });

    return true;
}

function finishLoginProcess(player, dbID) {
	player.guid = dbID;

    player.closeLogin();
    player.showChoose(LoginCamPoint);
}

function fetchPlayerCharacters(player) {

	db.fetchAllByField('owner', player.guid, 'Character', results => {
        if(results === undefined) {
        	return;
        }

        results.forEach((result) => {
            player.addCharacter(result.id, result.name);
        });
    });
}