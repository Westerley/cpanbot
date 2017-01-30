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
var auth_service_1 = require('./auth.service');
var AuthComponent = (function () {
    function AuthComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.email = '';
        this.password = '';
        this.error = '';
        this.loading = false;
    }
    AuthComponent.prototype.ngOnInit = function () {
        this.authService.logout();
    };
    AuthComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        var user = {
            email: this.email,
            password: this.password
        };
        this.authService.login(user)
            .subscribe(function (res) {
            _this.loading = false;
            _this.router.navigate(['']);
        }, function (err) {
            _this.loading = false;
            _this.error = 'Usuário ou senha incorreta';
        });
    };
    AuthComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-auth',
            templateUrl: "./auth.component.html",
            styleUrls: ['./auth.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map