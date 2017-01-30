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
var InformationService = (function () {
    function InformationService(http) {
        this.http = http;
    }
    InformationService.prototype.getInformations = function (idsetor) {
        return this.http.get('http://localhost:3000/api/department/' + idsetor + '/information')
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    InformationService.prototype.addInformation = function (idsetor, departament) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('http://localhost:3000/api/department/' + idsetor + '/information/create', JSON.stringify(departament), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    InformationService.prototype.editInformation = function (idsetor, idinfo, departament) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('http://localhost:3000/api/department/' + idsetor + '/information/' + idinfo, JSON.stringify(departament), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    InformationService.prototype.viewInformation = function (idsetor, idinfo) {
        return this.http.get('http://localhost:3000/api/department/' + idsetor + '/information/' + idinfo)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    InformationService.prototype.deleteInformation = function (idsetor, idinfo) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('http://localhost:3000/api/department/' + idsetor + '/information/' + idinfo, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Rx_1.Observable.throw(err.json()); });
    };
    InformationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InformationService);
    return InformationService;
}());
exports.InformationService = InformationService;
//# sourceMappingURL=information.service.js.map