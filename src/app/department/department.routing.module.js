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
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var department_component_1 = require("./department.component");
var information_component_1 = require("./information/information.component");
var auth_guard_1 = require("../auth/auth.guard");
var department_add_component_1 = require("./department-add/department-add.component");
var department_edit_component_1 = require("./department-edit/department-edit.component");
var information_add_component_1 = require("./information/information-add/information-add.component");
var information_edit_component_1 = require("./information/information-edit/information-edit.component");
var DepartmentRoutes = [
    { path: 'department', component: department_component_1.DepartmentComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'department/add', component: department_add_component_1.DepartmentAddComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'department/edit/:id', component: department_edit_component_1.DepartmentEditComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'department/info/:id', component: information_component_1.InformationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'department/info/add/:id', component: information_add_component_1.InformationAddComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'department/info/edit/:id/:idinfo', component: information_edit_component_1.InformationEditComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var DepartmentRoutingModule = (function () {
    function DepartmentRoutingModule() {
    }
    DepartmentRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(DepartmentRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], DepartmentRoutingModule);
    return DepartmentRoutingModule;
}());
exports.DepartmentRoutingModule = DepartmentRoutingModule;
//# sourceMappingURL=department.routing.module.js.map