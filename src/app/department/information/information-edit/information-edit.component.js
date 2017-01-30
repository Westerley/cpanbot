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
var information_1 = require('../information');
var information_service_1 = require('../information.service');
var InformationEditComponent = (function () {
    function InformationEditComponent(activatedRoute, informationService) {
        this.activatedRoute = activatedRoute;
        this.informationService = informationService;
        this.information = new information_1.Information();
        this.success = '';
        this.error = '';
    }
    InformationEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.informationService.viewInformation(params['id'], params['idinfo'])
                .subscribe(function (res) {
                _this.information.question = res.question;
                _this.information.answer = res.answer;
            }, function (err) {
                alert(" " + err.error);
            });
        });
    };
    InformationEditComponent.prototype.editInformation = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.informationService.editInformation(params['id'], params['idinfo'], _this.information)
                .subscribe(function (res) {
                _this.success = 'Pergunta salva com sucesso';
                _this.error = '';
            }, function (err) {
                _this.error = " " + err.error;
                _this.success = '';
            });
        });
    };
    InformationEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-information-edit',
            templateUrl: "information-edit.component.html",
            styleUrls: ['../../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, information_service_1.InformationService])
    ], InformationEditComponent);
    return InformationEditComponent;
}());
exports.InformationEditComponent = InformationEditComponent;
//# sourceMappingURL=information-edit.component.js.map