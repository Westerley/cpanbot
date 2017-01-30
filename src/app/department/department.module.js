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
var department_component_1 = require("./department.component");
var department_add_component_1 = require("./department-add/department-add.component");
var department_edit_component_1 = require("./department-edit/department-edit.component");
var information_component_1 = require("./information/information.component");
var information_add_component_1 = require("./information/information-add/information-add.component");
var information_edit_component_1 = require("./information/information-edit/information-edit.component");
var department_service_1 = require("./department.service");
var information_service_1 = require("./information/information.service");
var department_routing_module_1 = require("./department.routing.module");
var DepartmentModule = (function () {
    function DepartmentModule() {
    }
    DepartmentModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule, department_routing_module_1.DepartmentRoutingModule],
            declarations: [department_component_1.DepartmentComponent, department_add_component_1.DepartmentAddComponent, department_edit_component_1.DepartmentEditComponent, information_component_1.InformationComponent, information_add_component_1.InformationAddComponent, information_edit_component_1.InformationEditComponent],
            providers: [department_service_1.DepartmentService, information_service_1.InformationService],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [])
    ], DepartmentModule);
    return DepartmentModule;
}());
exports.DepartmentModule = DepartmentModule;
//# sourceMappingURL=department.module.js.map