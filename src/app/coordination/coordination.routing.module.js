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
var auth_guard_1 = require("../auth/auth.guard");
var coordination_component_1 = require("./coordination.component");
var coordination_edit_component_1 = require("./coordination-edit/coordination-edit.component");
var coordination_add_component_1 = require("./coordination-add/coordination-add.component");
var CoordinationRoutes = [
    { path: 'coordination', component: coordination_component_1.CoordinationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'coordination/add', component: coordination_add_component_1.CoordinationAddComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'coordination/edit/:id', component: coordination_edit_component_1.CoordinationEditComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var CoordinationRoutingModule = (function () {
    function CoordinationRoutingModule() {
    }
    CoordinationRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(CoordinationRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], CoordinationRoutingModule);
    return CoordinationRoutingModule;
}());
exports.CoordinationRoutingModule = CoordinationRoutingModule;
//# sourceMappingURL=coordination.routing.module.js.map