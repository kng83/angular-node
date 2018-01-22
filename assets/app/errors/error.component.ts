import {Component, OnInit} from '@angular/core';
import {Error} from './error.model';
import {ErrorService} from './error.service';

// ta klase dodajemy do app.component bo ona caly czas bedzie w kodzie tylko bedzie sie pojawiac i znikac
@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles:[`
        .backdrop{
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit{

    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService){}

    //tutaj bedziemy nasluchiwac czy przyszedl error
    //nastepnie pobierzemy error i damy component zeby byl widoczny

    ngOnInit(){
        this.errorService.errorOccurred.subscribe(
            (error: Error)=>{
                this.error = error;
                this.display = 'block';
            }
        )
    }

    onErrorHandled() {
        this.display = 'none';
    }
}