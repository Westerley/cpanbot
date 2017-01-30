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
var user_service_1 = require('../user.service');
var UserPassComponent = (function () {
    function UserPassComponent(router, activatedRoute, userService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.error = '';
        this.success = '';
    }
    UserPassComponent.prototype.ngOnInit = function () { };
    UserPassComponent.prototype.editPassword = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            var editUser = {
                password: _this.password,
                password2: _this.password2
            };
            _this.userService.editPassword(params['id'], editUser)
                .subscribe(function (res) {
                _this.success = 'Usuário salvo com sucesso';
                _this.error = '';
                _this.password = '';
                _this.password2 = '';
            }, function (err) {
                _this.error = " " + err.error;
                _this.success = '';
                if (typeof err.error === 'undefined') {
                    _this.router.navigate(['/login']);
                }
            });
        });
    };
    UserPassComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-pass',
            templateUrl: "./user-pass.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, user_service_1.UserService])
    ], UserPassComponent);
    return UserPassComponent;
}());
exports.UserPassComponent = UserPassComponent;
//# sourceMappingURL=user-pass.component.js.map