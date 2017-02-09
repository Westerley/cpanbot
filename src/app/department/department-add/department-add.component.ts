import { Component, OnInit } from '@angular/core';

import { Department } from '../department';
import { DepartmentService } from '../department.service';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-departament-add',
    templateUrl: `department-add.component.html`,
    styleUrls: ['../../app.component.css']
})

export class DepartmentAddComponent implements OnInit {

    department = new Department();
    error = '';
    success = '';

    constructor(private router: Router, private departmentService: DepartmentService) { }

    ngOnInit() { }

    addDepartment() {
        this.departmentService.addDepartment(this.department)
            .subscribe(res => {
                this.success = 'Setor salvo com sucesso';
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
        this.department.name = '';
        this.department.description = '';
    }

}