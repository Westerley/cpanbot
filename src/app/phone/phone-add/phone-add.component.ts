import { Component, OnInit } from '@angular/core';

import { Phone } from '../phone';
import { PhoneService } from '../phone.service';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-phone-add',
    templateUrl: `./phone-add.component.html`,
    styleUrls: ['../../app.component.css']
})

export class PhoneAddComponent implements OnInit {

    phone = new Phone();
    phones: Phone[] = [];
    options = ['SETOR', 'COORDENAÇÃO', 'SECRETARIA'];
    error = '';
    success = '';

    constructor(private router: Router, private phoneService: PhoneService) { }

    ngOnInit() { }

    addPhone() {
        this.phone.name = this.phone.name.toUpperCase();
        this.phone.telephone = this.phone.telephone.toUpperCase();
        this.phone.option = this.phone.option.toUpperCase();
        this.phoneService.addPhone(this.phone)
            .subscribe(res => {
                this.success = 'Telefone salvo com sucesso';
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
        this.phone.name = '';
        this.phone.telephone = '';
        this.phone.option = '';
    }

}