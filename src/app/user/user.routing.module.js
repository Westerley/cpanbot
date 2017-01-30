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
var user_component_1 = require("./user.component");
var user_add_component_1 = require("./user-add/user-add.component");
var user_edit_component_1 = require("./user-edit/user-edit.component");
var user_pass_component_1 = require("./user-pass/user-pass.component");
var UserRoutes = [
    { path: 'user', component: user_component_1.UserComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user/add', component: user_add_component_1.UserAddComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user/edit/:id', component: user_edit_component_1.UserEditComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user/pass/:id', component: user_pass_component_1.UserPassComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var UserRoutingModule = (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(UserRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], UserRoutingModule);
    return UserRoutingModule;
}());
exports.UserRoutingModule = UserRoutingModule;
//# sourceMappingURL=user.routing.module.js.map