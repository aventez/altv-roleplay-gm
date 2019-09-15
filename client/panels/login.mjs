import * as alt from 'alt';
import * as native from 'natives';
import { showCursor } from 'client/basic/cursor.mjs';

import { View } from 'client/basic/view.mjs';
import { Camera } from 'client/basic/camera.mjs';

const url = 'http://resource/client/templates/login/index.html';
let webview = undefined;
let camera = undefined;
let yaw = 0;
let interval;

export function showDialog(regCamCoord) {
	webview = new View(url);
	webview.on('checkAccount', checkAccount);

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
    alt.offServer('login:ShowDialog', showDialog);
    alt.offServer('login:ShowError', showError);
    alt.offServer('login:CloseDialog', closeDialog);
}

export function showError(message) {
	webview.emit('error', message);
}

function checkAccount(username, password) {
	alt.emitServer('login:CheckAccount', username, password);
}

function rotateCamera() {
    if (camera === undefined) return;

    yaw += 0.01;
    camera.rotate(0, 0, yaw);
}