import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { CoordinationService } from '../coordination.service';
import { Subscription } from "rxjs";
import {Coordination} from "../coordination";

@Component({
    moduleId: module.id,
    selector: 'app-coordination-edit',
    templateUrl: `./coordination-edit.component.html`,
    styleUrls: ['../../app.component.css']
})

export class CoordinationEditComponent implements OnInit {

    coordination = new Coordination();
    options = ['BACHARELADO', 'LICENCIATURA', 'PÓSGRADUAÇÃO'];
    error = '';
    success = '';
    subscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private coordinationService: CoordinationService) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.coordinationService.viewCoordination(params['id'])
                    .subscribe(res => {
                        this.coordination.course      = res.course;
                        this.coordination.coordinator = res.coordinator;
                        this.coordination.office_hour = res.office_hour;
                        this.coordination.type        = res.type;
                        this.coordination.link        = res.link;
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

    editCoordination() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.coordination.course = this.coordination.course.toUpperCase();
                this.coordination.coordinator = this.coordination.coordinator.toUpperCase();
                this.coordination.office_hour = this.coordination.office_hour.toUpperCase();
                this.coordinationService.editCoordination(params['id'], this.coordination)
                    .subscribe(res => {
                        this.success = 'Coordenação salva com sucesso';
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