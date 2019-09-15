import * as alt from 'alt';

//import login functions
import * as loginSystem from '../basic/login.mjs';

alt.onClient("login:CheckAccount", loginSystem.checkData);

alt.onClient("choose:Ready", loginSystem.ready);

alt.onClient("choose:Picked", loginSystem.pickCharacter);