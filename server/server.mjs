import * as alt from 'alt';

import SQL from '../../postgres-wrapper/database.mjs';

import * as config from './config/serverconfig.mjs';

import { Account, Character } from './entities/entities.mjs';

let connection = new SQL(
    config.database.type,
    config.database.address,
    config.database.port,
    config.database.user,
    config.database.password,
    config.database.name,

    [Account, Character]
);

alt.on('ConnectionComplete', () => {
	console.log('\x1b[33m%s\x1b[0m', `=== Starting ${config.serverData.name} (${config.serverData.version}) ===`);
	
	//Events
	loadModule('./entities/entities.mjs');
	loadModule('./events/playerConnect.mjs');
	loadModule('./clientEvents/events.mjs');
	loadModule('./basic/encrypt.mjs');
});


//Import module with information in console
function loadModule(name) {
	console.log('\x1b[36m%s\x1b[0m', `== Loading "${name}"...`);
	import(name);
}