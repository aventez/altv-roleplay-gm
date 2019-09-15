import * as alt from 'alt';
import * as native from 'natives';
import { showCursor } from 'client/basic/cursor.mjs';

import { View } from 'client/basic/view.mjs';
import { Camera } from 'client/basic/camera.mjs';

const url = 'http://resource/client/templates/chooseChar/index.html';
let webview;
let camera = undefined;
let yaw = 0;
let interval;

export function showDialog(regCamCoord) {
    webview = new View(url);
    
    webview.on('choose:PickCharacter', pickCharacter);
    webview.on('choose:Ready', ready);

	regCamCoord.z += 150;
    camera = new Camera(regCamCoord, 90);
    interval = alt.setInterval(rotateCamera, 1);
}

export function closeDialog() {
    if (interval) {
        alt.clearInterval(interval);
        interval = undefined;
    }
    camera.destroy();
    camera = undefined;


    // Close webview
    webview.close();

    // Unregister Events
    alt.offServer('choose:ShowDialog', showDialog);
    alt.offServer('choose:CloseDialog', closeDialog);
    alt.offServer('choose:AddCharacter', addCharacter);
}

export function addCharacter(id, name) {
    webview.emit('choose:AddChar', id, name);
}

export function ready() {
    alt.emitServer('choose:Ready');
}

function pickCharacter(uid) {
    alt.emitServer('choose:Picked', uid);
}

function rotateCamera() {
    if (camera === undefined) return;

    yaw += 0.01;
    camera.rotate(0, 0, yaw);
}