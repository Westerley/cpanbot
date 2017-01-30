import { Component, OnInit } from '@angular/core';
import { Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
    moduleId: module.id,
    selector: 'app-departament-edit',
    templateUrl: `department-edit.component.html`,
    styleUrls: ['../../app.component.css']
})

export class DepartmentEditComponent implements OnInit {

    department = new Department();
    error = '';
    success = '';
    subscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentService) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.departmentService.viewDepartment(params['id'])
                    .subscribe(res => {
                        this.department.name = res.name;
                        this.department.description = res.description;
                        this.department.supervisor = res.supervisor;
                        this.department.place = res.place;
                        this.department.email = res.email;
                        this.department.hours_operation = res.hours_operation;
                    }, err => {
                        if (typeof err.error === 'undefined') {
                            this.router.navigate(['/login']);
                        } else {
                            alert(" " + err.error);
                        }
                    });
            }
        )
    }

    editDepartment() {
        this.subscription = this.activatedRoute.params.subscribe(
            (params: any) => {
                this.departmentService.editDepartment(params['id'], this.department)
                    .subscribe(res => {
                        this.success = 'Setor salvo com sucesso';
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