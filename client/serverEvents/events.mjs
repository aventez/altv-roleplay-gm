import * as alt from 'alt';

//login menu
import * as loginPanel from 'client/panels/login.mjs';
import * as choosePanel from 'client/panels/choose.mjs';
import * as hudPanel from 'client/panels/hud.mjs';
import * as shaders from 'client/basic/shaders.mjs';

//Server emits
alt.onServer('login:ShowDialog', loginPanel.showDialog);
alt.onServer('login:ShowError', loginPanel.showError);
alt.onServer('login:CloseDialog', loginPanel.closeDialog);

alt.onServer('choose:ShowDialog', choosePanel.showDialog);
alt.onServer('choose:CloseDialog', choosePanel.closeDialog);
alt.onServer('choose:AddCharacter', choosePanel.addCharacter);

alt.onServer('hud:ShowDialog', hudPanel.showDialog);
alt.onServer('hud:SetMoney', hudPanel.setMoney);
alt.onServer('hud:SetName', hudPanel.setName);
//Shaders
alt.onServer('shaders:FadeOut', shaders.fadeOut);
alt.onServer('shaders:FadeIn', shaders.fadeIn);
alt.onServer('shaders:BlurOut', shaders.blurOut);
alt.onServer('shaders:BlurIn', shaders.blurIn);
alt.onServer('shaders:FadeOutFadeIn', shaders.fadeOutFadeIn); // 2 params of milliseconds