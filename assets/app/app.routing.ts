import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";


//do lazyloading dajemy loadChildern zamiast childern
// { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
//do loadChildren przekazujemy sciezke do naszego modulu oraz jego nazwe po #
// Ten module do lazy loading zostal dodany w konfiguracji webpacka w webpack.config.prod.js

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren:'./auth/auth.module#AuthModule'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);