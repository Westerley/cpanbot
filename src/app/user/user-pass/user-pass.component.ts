import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UserService } from '../user.service';
import { Subscription } from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'app-user-pass',
    templateUrl: `./user-pass.component.html`,
    styleUrls: ['../../app.component.css']
})

export class UserPassComponent implements OnInit {

    password: string;
    password2: string;
    error = '';
    success = '';
    subscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

    ngOnInit() { }

    editPassword() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                var editUser = {
                    password: this.password,
                    password2: this.password2
                };
                this.userService.editPassword(params['id'], editUser)
                    .subscribe(res => {
                        this.success = 'Usuário salvo com sucesso';
                        this.error = '';
                        this.password = '';
                        this.password2 = '';
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