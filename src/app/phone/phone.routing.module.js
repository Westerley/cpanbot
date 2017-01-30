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
var phone_component_1 = require("./phone.component");
var phone_add_component_1 = require("./phone-add/phone-add.component");
var phone_edit_component_1 = require("./phone-edit/phone-edit.component");
var PhoneRoutes = [
    { path: 'phone', component: phone_component_1.PhoneComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'phone/add', component: phone_add_component_1.PhoneAddComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'phone/edit/:id', component: phone_edit_component_1.PhoneEditComponent, canActivate: [auth_guard_1.AuthGuard] },
];
var PhoneRoutingModule = (function () {
    function PhoneRoutingModule() {
    }
    PhoneRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(PhoneRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], PhoneRoutingModule);
    return PhoneRoutingModule;
}());
exports.PhoneRoutingModule = PhoneRoutingModule;
//# sourceMappingURL=phone.routing.module.js.map