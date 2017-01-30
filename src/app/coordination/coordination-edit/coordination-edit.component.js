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
var coordination_service_1 = require('../coordination.service');
var coordination_1 = require("../coordination");
var CoordinationEditComponent = (function () {
    function CoordinationEditComponent(activatedRoute, router, coordinationService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.coordinationService = coordinationService;
        this.coordination = new coordination_1.Coordination();
        this.options = ['BACHARELADO', 'LICENCIATURA'];
        this.error = '';
        this.success = '';
    }
    CoordinationEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.coordinationService.viewCoordination(params['id'])
                .subscribe(function (res) {
                _this.coordination.course = res.course;
                _this.coordination.coordinator = res.coordinator;
                _this.coordination.office_hour = res.office_hour;
                _this.coordination.type = res.type;
                _this.coordination.link = res.link;
            }, function (err) {
                if (typeof err.error === 'undefined') {
                    _this.router.navigate(['/login']);
                }
            });
        });
    };
    CoordinationEditComponent.prototype.editCoordination = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.coordination.course = _this.coordination.course.toUpperCase();
            _this.coordination.coordinator = _this.coordination.coordinator.toUpperCase();
            _this.coordination.office_hour = _this.coordination.office_hour.toUpperCase();
            _this.coordinationService.editCoordination(params['id'], _this.coordination)
                .subscribe(function (res) {
                _this.success = 'Coordenação salva com sucesso';
                _this.error = '';
            }, function (err) {
                _this.error = " " + err.error;
                _this.success = '';
                if (typeof err.error === 'undefined') {
                    _this.router.navigate(['/login']);
                }
            });
        });
    };
    CoordinationEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-coordination-edit',
            templateUrl: "./coordination-edit.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, coordination_service_1.CoordinationService])
    ], CoordinationEditComponent);
    return CoordinationEditComponent;
}());
exports.CoordinationEditComponent = CoordinationEditComponent;
//# sourceMappingURL=coordination-edit.component.js.map