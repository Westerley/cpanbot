import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Coordination } from '../coordination';
import { CoordinationService } from '../coordination.service';

@Component({
    moduleId: module.id,
    selector: 'app-coordination-add',
    templateUrl: `./coordination-add.component.html`,
    styleUrls: ['../../app.component.css']
})

export class CoordinationAddComponent implements OnInit {

    coordination = new Coordination();
    options = ['BACHARELADO', 'LICENCIATURA'];
    error = '';
    success = '';

    constructor(private router: Router, private coordinationService: CoordinationService) { }

    ngOnInit() { }

    addCoordination() {
        this.coordination.course = this.coordination.course.toUpperCase();
        this.coordination.coordinator = this.coordination.coordinator.toUpperCase();
        this.coordination.office_hour = this.coordination.office_hour.toUpperCase();
        this.coordinationService.addCoordination(this.coordination)
            .subscribe(res => {
                this.success = 'Coordenação salva com sucesso';
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
        this.coordination.course = '';
        this.coordination.coordinator = '';
        this.coordination.office_hour = '';
        this.coordination.link = '';
    }

}