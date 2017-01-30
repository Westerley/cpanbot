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
var phone_1 = require('../phone');
var phone_service_1 = require('../phone.service');
var router_1 = require("@angular/router");
var PhoneEditComponent = (function () {
    function PhoneEditComponent(activatedRoute, phoneService) {
        this.activatedRoute = activatedRoute;
        this.phoneService = phoneService;
        this.phone = new phone_1.Phone();
        this.options = ['SETOR', 'COORDENAÇÃO', 'SECRETARIA'];
        this.error = '';
        this.success = '';
    }
    PhoneEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.phoneService.viewPhone(params['id'])
                .subscribe(function (res) {
                _this.phone.name = res.name;
                _this.phone.telephone = res.telephone;
                _this.phone.option = res.option;
            }, function (err) {
                alert(" " + err.error);
            });
        });
    };
    PhoneEditComponent.prototype.editPhone = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.phone.name = _this.phone.name.toUpperCase();
            _this.phone.telephone = _this.phone.telephone.toUpperCase();
            _this.phone.option = _this.phone.option.toUpperCase();
            _this.phoneService.editPhone(params['id'], _this.phone)
                .subscribe(function (res) {
                _this.success = 'Telefone salvo com sucesso';
                _this.error = '';
            }, function (err) {
                _this.error = " " + err.error;
                _this.success = '';
            });
        });
    };
    PhoneEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-phone-edit',
            templateUrl: "./phone-edit.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, phone_service_1.PhoneService])
    ], PhoneEditComponent);
    return PhoneEditComponent;
}());
exports.PhoneEditComponent = PhoneEditComponent;
//# sourceMappingURL=phone-edit.component.js.map