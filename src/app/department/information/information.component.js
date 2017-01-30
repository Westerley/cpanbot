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
var information_service_1 = require('./information.service');
var InformationComponent = (function () {
    function InformationComponent(activatedRoute, informationService) {
        this.activatedRoute = activatedRoute;
        this.informationService = informationService;
        this.informations = [];
    }
    InformationComponent.prototype.ngOnInit = function () {
        this.getInformations();
    };
    InformationComponent.prototype.getInformations = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.informationService.getInformations(params['id'])
                .subscribe(function (res) {
                _this.informations = res;
                _this.idDepartment = params['id'];
            }, function (err) {
                alert(" " + err.error);
            });
        });
    };
    InformationComponent.prototype.deleteInformation = function (id) {
        var _this = this;
        var question = confirm("Deseja deletar a pergunta?");
        if (question) {
            this.subscription = this.activatedRoute.params.subscribe(function (params) {
                _this.informationService.deleteInformation(params['id'], id)
                    .subscribe(function (res) {
                    var informations = _this.informations;
                    for (var i = 0; i < informations.length; i++) {
                        if (informations[i]._id == id) {
                            informations.splice(i, 1);
                        }
                    }
                }, function (err) {
                    alert(" " + err.error);
                });
            });
        }
    };
    InformationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-information',
            templateUrl: "information.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, information_service_1.InformationService])
    ], InformationComponent);
    return InformationComponent;
}());
exports.InformationComponent = InformationComponent;
//# sourceMappingURL=information.component.js.map