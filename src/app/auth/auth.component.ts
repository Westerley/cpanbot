import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-auth',
    templateUrl: `./auth.component.html`,
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

    email: string = '';
    password: string = '';
    error = '';
    loading =  false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.logout();
    }

    login() {
        this.loading = true;
        var user = {
            email: this.email,
            password: this.password
        };
        this.authService.login(user)
            .subscribe(res => {
                this.loading = false;
                this.router.navigate(['']);
            }, err => {
                this.loading = false;
                this.error = 'Usuário ou senha incorreta';
            });
    }

}