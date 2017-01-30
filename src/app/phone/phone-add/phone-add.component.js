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
var PhoneAddComponent = (function () {
    function PhoneAddComponent(phoneService) {
        this.phoneService = phoneService;
        this.phone = new phone_1.Phone();
        this.phones = [];
        this.options = ['SETOR', 'COORDENAÇÃO', 'SECRETARIA'];
        this.error = '';
        this.success = '';
    }
    PhoneAddComponent.prototype.ngOnInit = function () { };
    PhoneAddComponent.prototype.addPhone = function () {
        var _this = this;
        this.phone.name = this.phone.name.toUpperCase();
        this.phone.telephone = this.phone.telephone.toUpperCase();
        this.phone.option = this.phone.option.toUpperCase();
        this.phoneService.addPhone(this.phone)
            .subscribe(function (res) {
            _this.success = 'Telefone salvo com sucesso';
            _this.error = '';
            _this.cleanFields();
        }, function (err) {
            _this.error = " " + err.error;
            _this.success = '';
        });
    };
    PhoneAddComponent.prototype.cleanFields = function () {
        this.phone.name = '';
        this.phone.telephone = '';
        this.phone.option = '';
    };
    PhoneAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-phone-add',
            templateUrl: "./phone-add.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [phone_service_1.PhoneService])
    ], PhoneAddComponent);
    return PhoneAddComponent;
}());
exports.PhoneAddComponent = PhoneAddComponent;
//# sourceMappingURL=phone-add.component.js.map