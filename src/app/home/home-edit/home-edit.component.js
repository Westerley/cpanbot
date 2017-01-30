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
var home_service_1 = require('../home.service');
var HomeEditComponent = (function () {
    function HomeEditComponent(activatedRoute, router, homeService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.homeService = homeService;
        this.error = '';
        this.success = '';
    }
    HomeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.homeService.viewHome(params['id'])
                .subscribe(function (res) {
                _this.name = res.name;
            }, function (err) {
                alert(" " + err.error);
            });
        });
    };
    HomeEditComponent.prototype.editHome = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            var editHome = {
                name: _this.name
            };
            _this.homeService.editHome(params['id'], editHome)
                .subscribe(function (res) {
                _this.success = 'Salvo com sucesso';
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
    HomeEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: "./home-edit.component.html",
            styleUrls: ['../../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, home_service_1.HomeService])
    ], HomeEditComponent);
    return HomeEditComponent;
}());
exports.HomeEditComponent = HomeEditComponent;
//# sourceMappingURL=home-edit.component.js.map