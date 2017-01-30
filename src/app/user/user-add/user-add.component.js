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
var user_service_1 = require('../user.service');
var user_1 = require('../user');
var UserAddComponent = (function () {
    function UserAddComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.user = new user_1.User();
        this.users = [];
        this.error = '';
        this.success = '';
    }
    UserAddComponent.prototype.ngOnInit = function () { };
    UserAddComponent.prototype.addUser = function () {
        var _this = this;
        this.userService.addUser(this.user)
            .subscribe(function (res) {
            _this.users.push(res);
            _this.success = 'Usuário salvo com sucesso';
            _this.error = '';
            _this.cleanFields();
        }, function (err) {
            _this.error = " " + err.error;
            _this.success = '';
            if (typeof err.error === 'undefined') {
                _this.router.navigate(['/login']);
            }
        });
    };
    UserAddComponent.prototype.cleanFields = function () {
        this.user.name = '';
        this.user.email = '';
        this.user.password = '';
        this.user.password2 = '';
    };
    UserAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-add',
            templateUrl: "./user-add.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
    ], UserAddComponent);
    return UserAddComponent;
}());
exports.UserAddComponent = UserAddComponent;
//# sourceMappingURL=user-add.component.js.map