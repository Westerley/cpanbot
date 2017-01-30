import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: `./home.component.html`,
    styleUrls: ['../app.component.css']
})

export class HomeComponent implements OnInit {

    home: string[] = [];

    constructor(private router: Router, private homeService: HomeService) {}

    ngOnInit() {
        this.getHome()
    }

    getHome() {
        this.homeService.getHome()
            .subscribe(res => {
                this.home = res;
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                } else {
                    alert(" " + err.error);
                }
            });
    }

}