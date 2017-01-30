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
var Rx_1 = require("rxjs/Rx");
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getUsers = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('http://localhost:3000/api/user', { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    UserService.prototype.addUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('http://localhost:3000/api/user/create', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    UserService.prototype.editUser = function (id, user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('http://localhost:3000/api/user/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    UserService.prototype.editPassword = function (id, user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('http://localhost:3000/api/user/pass/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    UserService.prototype.viewUser = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('http://localhost:3000/api/user/' + id, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    UserService.prototype.deleteUser = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('http://localhost:3000/api/user/' + id, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map