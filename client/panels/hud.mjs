import * as alt from 'alt';
import * as native from 'natives';
import { showCursor } from 'client/basic/cursor.mjs';

import { View } from 'client/basic/view.mjs';

const url = 'http://resource/client/templates/hud/index.html';
let webview;

export function showDialog(regCamCoord) {
    webview = new alt.WebView(url);
    //showCursor(false);
    //alt.toggleGameControls(true);
    //native.displayHud(true);
    //webview.view.unfocus();
}

export function setName(name) {
    if(webview !== undefined) webview.emit('hud:SetName', name);
}

export function setMoney(money) {
    if(webview !== undefined) webview.emit('hud:SetMoney', money);
}