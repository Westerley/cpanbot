import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { Ng2PaginationModule } from "ng2-pagination";
import { UserComponent } from "./user.component";
import { UserService } from "./user.service";
import { UserRoutingModule } from "./user.routing.module";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserPassComponent } from "./user-pass/user-pass.component";

@NgModule({
    imports:      [ CommonModule, FormsModule, HttpModule, Ng2PaginationModule, UserRoutingModule ],
    declarations: [ UserComponent, UserAddComponent, UserEditComponent, UserPassComponent ],
    providers: [ UserService ],
    bootstrap:    [ ]
})
export class UserModule { }