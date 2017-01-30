import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Information } from '../information';
import { InformationService } from '../information.service';
import { Subscription } from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'app-information-add',
    templateUrl: `information-add.component.html`,
    styleUrls: ['../../../app.component.css']
})

export class InformationAddComponent implements OnInit {

    subscription: Subscription;
    information = new Information();
    success = '';
    error = '';

    constructor(private activatedRoute: ActivatedRoute, private informationService: InformationService) { }

    ngOnInit() { }

    addInformation() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.informationService.addInformation(params['id'], this.information)
                    .subscribe(res => {
                        this.success = 'Pergunta salva com sucesso';
                        this.error = '';
                        this.cleanFields();
                    }, err => {
                        this.error = " " + err.error;
                        this.success = '';
                    });
            }
        );
    }

    cleanFields() {
        this.information.question = '';
        this.information.answer = '';
    }

}