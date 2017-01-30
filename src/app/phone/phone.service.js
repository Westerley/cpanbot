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
var PhoneService = (function () {
    function PhoneService(http) {
        this.http = http;
    }
    PhoneService.prototype.getPhone = function () {
        return this.http.get('http://localhost:3000/api/phone')
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    PhoneService.prototype.addPhone = function (phone) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('http://localhost:3000/api/phone/create', JSON.stringify(phone), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    PhoneService.prototype.editPhone = function (id, phone) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('http://localhost:3000/api/phone/' + id, JSON.stringify(phone), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    PhoneService.prototype.viewPhone = function (id) {
        return this.http.get('http://localhost:3000/api/phone/' + id)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    PhoneService.prototype.deletePhone = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('http://localhost:3000/api/phone/' + id, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    PhoneService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PhoneService);
    return PhoneService;
}());
exports.PhoneService = PhoneService;
//# sourceMappingURL=phone.service.js.map