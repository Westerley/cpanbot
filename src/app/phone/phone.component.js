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
var phone_service_1 = require('./phone.service');
var PhoneComponent = (function () {
    function PhoneComponent(router, phoneService) {
        this.router = router;
        this.phoneService = phoneService;
        this.phones = [];
        this.options = ['Setor', 'Coordenação', 'Secretaria'];
        this.getPhones();
    }
    PhoneComponent.prototype.ngOnInit = function () {
    };
    PhoneComponent.prototype.getPhones = function () {
        var _this = this;
        this.phoneService.getPhone()
            .subscribe(function (res) {
            _this.phones = res;
        }, function (err) {
            alert(" " + err.error);
        });
    };
    PhoneComponent.prototype.deletePhone = function (_id) {
        var _this = this;
        var question = confirm("Deseja deletar o telefone");
        if (question) {
            this.phoneService.deletePhone(_id)
                .subscribe(function (res) {
                var phone = _this.phones;
                for (var i = 0; i < phone.length; i++) {
                    if (phone[i]._id == _id) {
                        phone.splice(i, 1);
                    }
                }
            }, function (err) {
                alert(" " + err.error);
            });
        }
    };
    PhoneComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-phone',
            templateUrl: "./phone.component.html",
            styleUrls: ['../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, phone_service_1.PhoneService])
    ], PhoneComponent);
    return PhoneComponent;
}());
exports.PhoneComponent = PhoneComponent;
//# sourceMappingURL=phone.component.js.map