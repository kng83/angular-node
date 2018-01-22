import {NgModule} from '@angular/core';
import {MessagesComponent} from './messages.component';
import {MessageInputComponent} from './message-input.component';
import {MessageListComponent} from './message-list.component';
import {MessageComponent} from './message.component';
//Potrzebujemy CommonModule do dyrektryw jak ngIf, jescze formsModule
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MessageService} from './message.service';



@NgModule({
    declarations: [
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    providers:[MessageService]

})
export class MessageModule{}