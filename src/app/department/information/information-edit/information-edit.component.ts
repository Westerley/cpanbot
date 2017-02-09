import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Information } from '../information';
import { InformationService } from '../information.service';
import { Subscription } from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'app-information-edit',
    templateUrl: `information-edit.component.html`,
    styleUrls: ['../../../app.component.css']
})

export class InformationEditComponent implements OnInit {

    subscription: Subscription;
    information = new Information();
    success = '';
    error = '';

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private informationService: InformationService) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.informationService.viewInformation(params['id'], params['idinfo'])
                    .subscribe(res => {
                        this.information.question = res.question;
                        this.information.answer = res.answer;
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

    editInformation() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.informationService.editInformation(params['id'], params['idinfo'], this.information)
                    .subscribe(res => {
                        this.success = 'Pergunta salva com sucesso';
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