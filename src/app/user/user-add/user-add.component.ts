import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    moduleId: module.id,
    selector: 'app-user-add',
    templateUrl: `./user-add.component.html`,
    styleUrls: ['../../app.component.css']
})

export class UserAddComponent implements OnInit {

    user = new User();
    users: User[] = [];
    error = '';
    success = '';

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() { }

    addUser() {
        this.userService.addUser(this.user)
            .subscribe(res => {
                this.users.push(res);
                this.success = 'Usuário salvo com sucesso';
                this.error = '';
                this.cleanFields();
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                } else {
                    this.error = " " + err.error;
                    this.success = '';
                }
            });
    }

    cleanFields() {
        this.user.name = '';
        this.user.email = '';
        this.user.password = '';
        this.user.password2 = '';
    }

}