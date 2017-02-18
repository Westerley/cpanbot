import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Phone } from './phone';
import { PhoneService } from './phone.service';

@Component({
    moduleId: module.id,
    selector: 'app-phone',
    templateUrl: `./phone.component.html`,
    styleUrls: ['../app.component.css']
})

export class PhoneComponent implements OnInit {

    phones: Phone[] = [];
    options = ['Setor', 'Coordenação', 'Secretaria'];

    constructor(private router: Router, private phoneService: PhoneService) {
        this.getPhones();
    }

    ngOnInit() {
    }

    getPhones() {
        this.phoneService.getPhone()
            .subscribe(res => {
                this.phones = res;
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                } else {
                    alert(" " + err.error);
                }
            });
    }

    deletePhone(_id: number) {
        var question = confirm("Deseja deletar o telefone");
        if (question) {
            this.phoneService.deletePhone(_id)
                .subscribe(res => {
                    var phone = this.phones;
                    for (var i = 0; i < phone.length; i++) {
                        if (phone[i]._id == _id) {
                            phone.splice(i, 1);
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