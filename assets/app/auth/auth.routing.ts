import {RouterModule, Routes} from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];

//poniewaz nie jest to glowny router a chcemy zrobic lazy loading to dajemy forChild
//do niego przekazujemy nasze trasy
export const authRouting = RouterModule.forChild(AUTH_ROUTES);






//w starej wersji eksportowalismy cala zmienna przechowujaca trasy:
/*
export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];*/
