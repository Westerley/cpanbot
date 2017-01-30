import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { Ng2PaginationModule } from "ng2-pagination";
import { DepartmentComponent } from "./department.component";
import { DepartmentAddComponent } from "./department-add/department-add.component";
import { DepartmentEditComponent } from "./department-edit/department-edit.component";
import { InformationComponent } from "./information/information.component";
import { InformationAddComponent } from "./information/information-add/information-add.component";
import { InformationEditComponent } from "./information/information-edit/information-edit.component";

import { DepartmentService } from "./department.service";
import { InformationService } from "./information/information.service";

import { DepartmentRoutingModule } from "./department.routing.module";

@NgModule({
    imports:      [ CommonModule, FormsModule, HttpModule, Ng2PaginationModule, DepartmentRoutingModule ],
    declarations: [ DepartmentComponent, DepartmentAddComponent, DepartmentEditComponent, InformationComponent, InformationAddComponent, InformationEditComponent ],
    providers: [ DepartmentService, InformationService ],
    bootstrap:    [ ]
})
export class DepartmentModule { }