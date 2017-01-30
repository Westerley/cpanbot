import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { HomeService } from '../home.service';
import { Subscription } from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: `./home-edit.component.html`,
    styleUrls: ['../../app.component.css']
})

export class HomeEditComponent implements OnInit {

    name: string;
    error = '';
    success = '';
    subscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private homeService: HomeService) {}

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.homeService.viewHome(params['id'])
                    .subscribe(res => {
                        this.name = res.name;
                    }, err => {
                        if (typeof err.error === 'undefined') {
                            this.router.navigate(['/login']);
                        }
                        alert(" " + err.error);
                    });
            }
        );
    }

    editHome() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                var editHome = {
                    name: this.name
                };
                this.homeService.editHome(params['id'], editHome)
                    .subscribe(res => {
                        this.success = 'Salvo com sucesso';
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