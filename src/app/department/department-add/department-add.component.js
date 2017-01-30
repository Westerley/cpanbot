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
var department_1 = require('../department');
var department_service_1 = require('../department.service');
var DepartmentAddComponent = (function () {
    function DepartmentAddComponent(departmentService) {
        this.departmentService = departmentService;
        this.department = new department_1.Department();
        this.error = '';
        this.success = '';
    }
    DepartmentAddComponent.prototype.ngOnInit = function () { };
    DepartmentAddComponent.prototype.addDepartment = function () {
        var _this = this;
        this.departmentService.addDepartment(this.department)
            .subscribe(function (res) {
            _this.success = 'Setor salvo com sucesso';
            _this.error = '';
            _this.cleanFields();
        }, function (err) {
            _this.error = " " + err.error;
            _this.success = '';
        });
    };
    DepartmentAddComponent.prototype.cleanFields = function () {
        this.department.name = '';
        this.department.description = '';
        this.department.supervisor = '';
        this.department.place = '';
        this.department.email = '';
        this.department.hours_operation = '';
    };
    DepartmentAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-departament-add',
            templateUrl: "department-add.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [department_service_1.DepartmentService])
    ], DepartmentAddComponent);
    return DepartmentAddComponent;
}());
exports.DepartmentAddComponent = DepartmentAddComponent;
//# sourceMappingURL=department-add.component.js.map