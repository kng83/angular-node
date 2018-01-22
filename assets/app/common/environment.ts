
// Sprawdzenie czy jestesmy w wersji normalnej czy developerskiej
import {isDevMode} from '@angular/core';
let serverPicker:string ='https://angular-node-dev.herokuapp.com';

if(isDevMode()){
    serverPicker = 'http://localhost:3000';
}


export const serverUrl = serverPicker;