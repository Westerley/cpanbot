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
var department_service_1 = require('./department.service');
var DepartmentComponent = (function () {
    function DepartmentComponent(departmentService) {
        this.departmentService = departmentService;
        this.departments = [];
        this.getDepartments();
    }
    DepartmentComponent.prototype.ngOnInit = function () {
    };
    DepartmentComponent.prototype.getDepartments = function () {
        var _this = this;
        this.departmentService.getDepartments()
            .subscribe(function (res) {
            _this.departments = res;
        }, function (err) {
            alert(" " + err.error);
        });
    };
    DepartmentComponent.prototype.deleteDepartment = function (id) {
        var _this = this;
        var question = confirm("Deseja deletar o telefone");
        if (question) {
            this.departmentService.deleteDepartment(id)
                .subscribe(function (res) {
                var department = _this.departments;
                for (var i = 0; i < department.length; i++) {
                    if (department[i]._id == id) {
                        department.splice(i, 1);
                    }
                }
            }, function (err) {
                alert(" " + err.error);
            });
        }
    };
    DepartmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-departament',
            templateUrl: "department.component.html",
            styleUrls: ['../app.component.css']
        }), 
        __metadata('design:paramtypes', [department_service_1.DepartmentService])
    ], DepartmentComponent);
    return DepartmentComponent;
}());
exports.DepartmentComponent = DepartmentComponent;
//# sourceMappingURL=department.component.js.map