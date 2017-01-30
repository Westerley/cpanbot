import { Component, OnInit } from '@angular/core';

import { Department } from './department';
import { DepartmentService } from './department.service';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-departament',
    templateUrl: `department.component.html`,
    styleUrls: ['../app.component.css']
})

export class DepartmentComponent implements OnInit {

    departments: Department[] = [];

    constructor(private router: Router, private departmentService: DepartmentService) {
        this.getDepartments();
    }

    ngOnInit() {
    }

    getDepartments() {
        this.departmentService.getDepartments()
            .subscribe(res => {
                this.departments = res;
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                } else {
                    alert(" " + err.error);
                }
            });
    }

    deleteDepartment(id: number) {
        var question = confirm("Deseja deletar o telefone");
        if (question) {
            this.departmentService.deleteDepartment(id)
                .subscribe(res => {
                    var department = this.departments;
                    for (var i = 0; i < department.length; i++) {
                        if (department[i]._id == id) {
                            department.splice(i, 1);
                        }
                    }
                }, err => {
                    if (typeof err.error === 'undefined') {
                        this.router.navigate(['/login']);
                    }
                    alert(" " + err.error);
                });
        }
    }

}