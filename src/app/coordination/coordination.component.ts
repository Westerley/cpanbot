import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Coordination } from './coordination';
import { CoordinationService } from './coordination.service';

@Component({
    moduleId: module.id,
    selector: 'app-coordination',
    templateUrl: `./coordination.component.html`,
    styleUrls: ['../app.component.css']
})

export class CoordinationComponent implements OnInit {

    coordination: Coordination[] = [];

    constructor(private router: Router, private coordinationService: CoordinationService) {
        this.coordinationService.getCoordination()
            .subscribe(res => {
                this.coordination = res;
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                } else {
                    alert('Não foi possivel carregar as informações');
                }
            });
    }

    ngOnInit() {
    }

    deleteCoordination(id: number) {
        var question = confirm("Deseja deletar a coordenação?");
        if (question) {
            this.coordinationService.deleteCoordination(id)
                .subscribe(res => {
                    var coordination = this.coordination;
                    for (var i = 0; i < coordination.length; i++) {
                        if (coordination[i]._id == id) {
                            coordination.splice(i, 1);
                        }
                    }
                }, err => {
                    alert('Não foi possivel deletar a coordenação');
                });
        }
    }

}