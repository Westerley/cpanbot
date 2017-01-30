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
var phone_component_1 = require("./phone.component");
var phone_service_1 = require("./phone.service");
var ng2_pagination_1 = require("ng2-pagination");
var phone_routing_module_1 = require("./phone.routing.module");
var phone_add_component_1 = require("./phone-add/phone-add.component");
var phone_edit_component_1 = require("./phone-edit/phone-edit.component");
var PhoneModule = (function () {
    function PhoneModule() {
    }
    PhoneModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule, phone_routing_module_1.PhoneRoutingModule],
            declarations: [phone_component_1.PhoneComponent, phone_add_component_1.PhoneAddComponent, phone_edit_component_1.PhoneEditComponent],
            providers: [phone_service_1.PhoneService],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [])
    ], PhoneModule);
    return PhoneModule;
}());
exports.PhoneModule = PhoneModule;
//# sourceMappingURL=phone.module.js.map