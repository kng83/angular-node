import { Component} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {AuthService} from './auth.service';
import {User} from './user.model';
import {Router} from '@angular/router';


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService ,private  router: Router){}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password
        );
        this.authService.singin(user)
            .subscribe(
                // tutaj mamy 2 mozliwosci albo zapisujemy przez cookies albo przez localStorage
                // token w localstorage pozostanie przez 2 godziny
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId',data.userId);
                    //teraz po prawidlowym zalogowaniu idziemy do root-rout
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            )
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}