import * as alt from 'alt';
import * as native from 'natives';

import * as hudPanel from 'client/panels/hud.mjs';

alt.setInterval(() => {
    //if (!alt.Player.local.getSyncedMeta('loggedin')) return;

    hudPanel.setName(alt.Player.local.getSyncedMeta('name'));
    hudPanel.setMoney(alt.Player.local.getSyncedMeta('cash'));

    //alt.emitServer('hud:SetMoney', 1500);
    //alt.emitServer('hud:SetName', alt.Player.local.getSyncedMeta('name'));
}, 150);