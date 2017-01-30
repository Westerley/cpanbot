import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { Ng2PaginationModule } from "ng2-pagination";
import { CoordinationComponent } from "./coordination.component";
import { CoordinationAddComponent } from "./coordination-add/coordination-add.component";
import { CoordinationEditComponent } from "./coordination-edit/coordination-edit.component";

import { CoordinationRoutingModule } from "./coordination.routing.module";
import { CoordinationService } from "./coordination.service";

@NgModule({
    imports:      [ CommonModule, FormsModule, HttpModule, Ng2PaginationModule, CoordinationRoutingModule ],
    declarations: [ CoordinationComponent, CoordinationAddComponent, CoordinationEditComponent ],
    providers: [ CoordinationService ],
    bootstrap:    [ ]
})
export class CoordinationModule { }