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
var router_1 = require('@angular/router');
var router_2 = require("@angular/router");
var user_service_1 = require('../user.service');
var UserEditComponent = (function () {
    function UserEditComponent(router, activatedRoute, userService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.error = '';
        this.success = '';
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.userService.viewUser(params['id'])
                .subscribe(function (res) {
                _this.name = res.name;
                _this.email = res.email;
            }, function (err) {
                if (typeof err.error === 'undefined') {
                    _this.router.navigate(['/login']);
                }
            });
        });
    };
    UserEditComponent.prototype.editUser = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            var editUser = {
                name: _this.name,
                email: _this.email
            };
            _this.userService.editUser(params['id'], editUser)
                .subscribe(function (res) {
                _this.success = 'Usuário salvo com sucesso';
                _this.error = '';
            }, function (err) {
                _this.error = " " + err.error;
                _this.success = '';
                if (typeof err.error === 'undefined') {
                    _this.router.navigate(['/login']);
                }
            });
        });
    };
    UserEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-edit',
            templateUrl: "./user-edit.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_2.Router, router_1.ActivatedRoute, user_service_1.UserService])
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map