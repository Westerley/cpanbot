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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require("@angular/common");
var ng2_pagination_1 = require("ng2-pagination");
var coordination_component_1 = require("./coordination.component");
var coordination_add_component_1 = require("./coordination-add/coordination-add.component");
var coordination_edit_component_1 = require("./coordination-edit/coordination-edit.component");
var coordination_routing_module_1 = require("./coordination.routing.module");
var coordination_service_1 = require("./coordination.service");
var CoordinationModule = (function () {
    function CoordinationModule() {
    }
    CoordinationModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule, coordination_routing_module_1.CoordinationRoutingModule],
            declarations: [coordination_component_1.CoordinationComponent, coordination_add_component_1.CoordinationAddComponent, coordination_edit_component_1.CoordinationEditComponent],
            providers: [coordination_service_1.CoordinationService],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [])
    ], CoordinationModule);
    return CoordinationModule;
}());
exports.CoordinationModule = CoordinationModule;
//# sourceMappingURL=coordination.module.js.map