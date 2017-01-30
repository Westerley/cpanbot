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
var coordination_service_1 = require('./coordination.service');
var CoordinationComponent = (function () {
    function CoordinationComponent(router, coordinationService) {
        var _this = this;
        this.router = router;
        this.coordinationService = coordinationService;
        this.coordination = [];
        this.coordinationService.getCoordination()
            .subscribe(function (res) {
            _this.coordination = res;
        }, function (err) {
            alert('Não foi possivel carregar as informações');
        });
    }
    CoordinationComponent.prototype.ngOnInit = function () {
    };
    CoordinationComponent.prototype.deleteCoordination = function (id) {
        var _this = this;
        var question = confirm("Deseja deletar a coordenação?");
        if (question) {
            this.coordinationService.deleteCoordination(id)
                .subscribe(function (res) {
                var coordination = _this.coordination;
                for (var i = 0; i < coordination.length; i++) {
                    if (coordination[i]._id == id) {
                        coordination.splice(i, 1);
                    }
                }
            }, function (err) {
                alert('Não foi possivel deletar a coordenação');
            });
        }
    };
    CoordinationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-coordination',
            templateUrl: "./coordination.component.html",
            styleUrls: ['../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, coordination_service_1.CoordinationService])
    ], CoordinationComponent);
    return CoordinationComponent;
}());
exports.CoordinationComponent = CoordinationComponent;
//# sourceMappingURL=coordination.component.js.map