import { Component, OnInit } from '@angular/core';

import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
import { Subscription } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-phone-edit',
    templateUrl: `./phone-edit.component.html`,
    styleUrls: ['../../app.component.css']
})

export class PhoneEditComponent implements OnInit {

    phone = new Phone();
    options = ['SETOR', 'COORDENAÇÃO', 'SECRETARIA'];
    error = '';
    success = '';
    subscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private phoneService: PhoneService) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.phoneService.viewPhone(params['id'])
                    .subscribe(res => {
                        this.phone.name = res.name;
                        this.phone.telephone = res.telephone;
                        this.phone.option = res.option;
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

    editPhone() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.phone.name = this.phone.name.toUpperCase();
                this.phone.telephone = this.phone.telephone.toUpperCase();
                this.phone.option = this.phone.option.toUpperCase();
                this.phoneService.editPhone(params['id'], this.phone)
                    .subscribe(res => {
                        this.success = 'Telefone salvo com sucesso';
                        this.error = '';
                    }, err => {
                        if (typeof err.error === 'undefined') {
                            this.router.navigate(['/login']);
                        }
                        this.error = " " + err.error;
                        this.success = '';
                    });
            }
        );
    }

}