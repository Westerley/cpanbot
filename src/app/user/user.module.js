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
var user_component_1 = require("./user.component");
var user_service_1 = require("./user.service");
var user_routing_module_1 = require("./user.routing.module");
var user_add_component_1 = require("./user-add/user-add.component");
var user_edit_component_1 = require("./user-edit/user-edit.component");
var user_pass_component_1 = require("./user-pass/user-pass.component");
var UserModule = (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule, user_routing_module_1.UserRoutingModule],
            declarations: [user_component_1.UserComponent, user_add_component_1.UserAddComponent, user_edit_component_1.UserEditComponent, user_pass_component_1.UserPassComponent],
            providers: [user_service_1.UserService],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [])
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map