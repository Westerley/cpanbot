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
var coordination_1 = require('../coordination');
var coordination_service_1 = require('../coordination.service');
var CoordinationAddComponent = (function () {
    function CoordinationAddComponent(router, coordinationService) {
        this.router = router;
        this.coordinationService = coordinationService;
        this.coordination = new coordination_1.Coordination();
        this.options = ['BACHARELADO', 'LICENCIATURA'];
        this.error = '';
        this.success = '';
    }
    CoordinationAddComponent.prototype.ngOnInit = function () { };
    CoordinationAddComponent.prototype.addCoordination = function () {
        var _this = this;
        this.coordination.course = this.coordination.course.toUpperCase();
        this.coordination.coordinator = this.coordination.coordinator.toUpperCase();
        this.coordination.office_hour = this.coordination.office_hour.toUpperCase();
        this.coordinationService.addCoordination(this.coordination)
            .subscribe(function (res) {
            _this.success = 'Coordenação salva com sucesso';
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
    CoordinationAddComponent.prototype.cleanFields = function () {
        this.coordination.course = '';
        this.coordination.coordinator = '';
        this.coordination.office_hour = '';
        this.coordination.link = '';
    };
    CoordinationAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-coordination-add',
            templateUrl: "./coordination-add.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, coordination_service_1.CoordinationService])
    ], CoordinationAddComponent);
    return CoordinationAddComponent;
}());
exports.CoordinationAddComponent = CoordinationAddComponent;
//# sourceMappingURL=coordination-add.component.js.map