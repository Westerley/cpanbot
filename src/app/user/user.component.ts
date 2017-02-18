import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from './user.service';
import { User } from './user';

@Component({
    moduleId: module.id,
    selector: 'app-user',
    templateUrl: `./user.component.html`,
    styleUrls: ['../app.component.css']
})

export class UserComponent implements OnInit {

    users: User[] = [];

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(res => {
                this.users = res;
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                } else {
                    alert(" " + err.error);
                }
            });
    }

    deleteUser(id: number) {
        var question = confirm("Deseja deletar o usuário?");
        if (question) {
            this.userService.deleteUser(id)
                .subscribe(res => {
                    var user = this.users;
                    for (var i = 0; i < user.length; i++) {
                        if (user[i]._id == id) {
                            user.splice(i, 1);
                        }
                    }
                }, err => {
                    if (typeof err.error === 'undefined') {
                        this.router.navigate(['/login']);
                    } else {
                        alert(" " + err.error);
                    }
                });
        }
    }

}