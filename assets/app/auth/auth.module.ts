//Ten modul sluzy do tego by jak bedzie ladowanie modulow to bedzie lazy loading
//Bedziemy ladowali komponenty ktore bedziemy uzywac AuthGuard
//tutaj dodajemy nasz routing od lazy loading (autRouting)

import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './logout.component';
import {SigninComponent} from './signin.component';
import {SignupComponent} from './signup.component';
import {CommonModule} from '@angular/common';
import {authRouting} from './auth.routing';


@NgModule({
    declarations:[
        LogoutComponent,
        SignupComponent,
        SigninComponent,
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ],
    providers:[]
})
export class AuthModule{

}