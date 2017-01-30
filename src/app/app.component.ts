import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    public isLoggedIn : boolean;
    public email : string = '';

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.isLoggedInEmitter.subscribe(
            (show: boolean) => this.isLoggedIn = show
        );

        if (localStorage.getItem('auth_token')) {
            this.isLoggedIn = true;
            var token = localStorage.getItem('auth_token')
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var email = JSON.parse(window.atob(base64));
            this.email = email["email"];
        }

        if (!this.isLoggedIn) {
            this.authService.logout();
        }
    }
}
