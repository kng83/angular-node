import {Error} from './error.model';
import {EventEmitter} from '@angular/core';

//tutaj pobieramy nasze bledy wiadomo ze error ma title i zawiera obiekt s message;
export class ErrorService{
    errorOccurred = new EventEmitter<Error>();


    handleError(error:any){
        const errorData = new Error(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    }
}