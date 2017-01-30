import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Information } from './information';
import { InformationService } from './information.service';
import { Subscription } from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'app-information',
    templateUrl: `information.component.html`,
    styleUrls: ['../../app.component.css']
})

export class InformationComponent implements OnInit {

    informations: Information[] = [];
    subscription: Subscription;
    idDepartment: string;

    constructor(private activatedRoute: ActivatedRoute, private informationService: InformationService) { }

    ngOnInit() {
        this.getInformations();
    }

    getInformations() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.informationService.getInformations(params['id'])
                    .subscribe(res => {
                        this.informations = res;
                        this.idDepartment = params['id'];
                    }, err => {
                        alert(" " + err.error);
                    });
            }
        );
    }

    deleteInformation(id: number) {
        var question = confirm("Deseja deletar a pergunta?");
        if (question) {
            this.subscription = this.activatedRoute.params.subscribe(
                (params: any) => {
                    this.informationService.deleteInformation(params['id'], id)
                        .subscribe(res => {
                            var informations = this.informations;
                            for (var i = 0; i < informations.length; i++) {
                                if (informations[i]._id == id) {
                                    informations.splice(i, 1);
                                }
                            }
                        }, err => {
                            alert(" " + err.error);
                        });
                }
            );
        }
    }

}