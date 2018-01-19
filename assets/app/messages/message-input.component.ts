import {Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit{
    //message trafia do html gdzie jest warunkowo ustawiona jesli nie
    //jest undefined [ngModel]="message?.content"
    message: Message;
    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {

        if(this.message){
            //edit - jezeli istnieje to ja edytujemy
            this.message.content = form.value.content;
            this.message= null;
            //i tu musimy zrobic update naszego rekordu

        }else{
            //create - jezeli jest undefined to ja tworzymy
            // Observable zawsze ma 3 callbacki data ,error i end gdy jest complited
            const message = new Message(form.value.content, 'Max');
            this.messageService.addMessage(message).subscribe(
                data => console.log(data),
                error=> console.log(error),

            );
        }

        form.resetForm();
    }

    onClear(form: NgForm){
        //usuwanie formy po wcisnieciu clear
        //czyszenie obiektu message
        this.message = null;
        form.resetForm();
    }

    ngOnInit(){
        //tutaj pobieramy nasza edytowana message
        this.messageService.messageIsEdit.subscribe(
            (message:Message)=> this.message = message
        )}

}