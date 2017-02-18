import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

import { UserService } from '../user.service';
import { Subscription } from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'app-user-edit',
    templateUrl: `./user-edit.component.html`,
    styleUrls: ['../../app.component.css']
})

export class UserEditComponent implements OnInit {

    name: string;
    email: string;
    error = '';
    success = '';
    subscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userService.viewUser(params['id'])
                    .subscribe(res => {
                        this.name = res.name;
                        this.email = res.email;
                    }, err => {
                        if (typeof err.error === 'undefined') {
                            this.router.navigate(['/login']);
                        } else {
                            alert(" " + err.error);
                        }
                    });
            }
        );
    }

    editUser() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                var editUser = {
                    name: this.name,
                    email: this.email
                };
                this.userService.editUser(params['id'], editUser)
                    .subscribe(res => {
                        this.success = 'Usuário salvo com sucesso';
                        this.error = '';
                    }, err => {
                        if (typeof err.error === 'undefined') {
                            this.router.navigate(['/login']);
                        } else {
                            this.error = " " + err.error;
                            this.success = '';
                        }
                    });
            }
        );
    }

}