"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var department_1 = require('../department');
var department_service_1 = require('../department.service');
var DepartmentEditComponent = (function () {
    function DepartmentEditComponent(activatedRoute, departmentService) {
        this.activatedRoute = activatedRoute;
        this.departmentService = departmentService;
        this.department = new department_1.Department();
        this.error = '';
        this.success = '';
    }
    DepartmentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.departmentService.viewDepartment(params['id'])
                .subscribe(function (res) {
                _this.department.name = res.name;
                _this.department.description = res.description;
                _this.department.supervisor = res.supervisor;
                _this.department.place = res.place;
                _this.department.email = res.email;
                _this.department.hours_operation = res.hours_operation;
            }, function (err) {
                alert(" " + err.error);
            });
        });
    };
    DepartmentEditComponent.prototype.editDepartment = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.departmentService.editDepartment(params['id'], _this.department)
                .subscribe(function (res) {
                _this.success = 'Setor salvo com sucesso';
                _this.error = '';
            }, function (err) {
                _this.error = " " + err.error;
                _this.success = '';
            });
        });
    };
    DepartmentEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-departament-edit',
            templateUrl: "department-edit.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, department_service_1.DepartmentService])
    ], DepartmentEditComponent);
    return DepartmentEditComponent;
}());
exports.DepartmentEditComponent = DepartmentEditComponent;
//# sourceMappingURL=department-edit.component.js.map