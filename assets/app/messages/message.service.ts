import { Message } from "./message.model";

import {Http,Response,Headers} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";


@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>(); //emituje objekt message

    constructor(private http: Http){

    }
    addMessage(message: Message) {
        // ta odpowiedz jest skojarzona z metoda post w routerze
        //messages.js
        //tutaj zwracamy observable poniewaz chcemy ja rozwiazac w komponencie
        //Przy pierwszym podejsciu nie udalo sie wyslac wiadomosci bo byly zle naglowki
        //plain/text anie json i trzeba dodac headers

        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http
           .post('http://localhost:3000/message',body,{headers: headers})
           .map((response:Response)=>{
                return response.json();
           })
           .catch((error:Response)=>{
               // tutaj daje sie observable bo rxjs nie nadaje automatycznie
               // errorowi statusu observable i dlatego go tworzymy
               return Observable.throw(error.json());
           })

    }

    getMessages() {
        // Poniewaz odpowiedz zawiera np _v z bazy danych trzeba ja przerobic
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) =>{
                const messages = response.json().obj;
                let transformedMessages: Message[] =[];
                for(let message of messages){
                    transformedMessages.push(
                        new Message(
                            message.content,
                            'Dummy',
                            message.id,
                            null
                        ));
                }
                //tak zeby tu byl porzadek
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message){
        // w editMessage musimy przelinkowac nasza zaznaczona message do
        // pola inputa. Tak by mozna bylo zrobic edycje
        this.messageIsEdit.emit(message);
    }

    updateMessage(){

    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}