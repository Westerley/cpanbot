import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { PhoneComponent } from "./phone.component";
import { PhoneService } from "./phone.service";
import { Ng2PaginationModule } from "ng2-pagination";
import { PhoneRoutingModule } from "./phone.routing.module";
import { PhoneAddComponent } from "./phone-add/phone-add.component";
import { PhoneEditComponent } from "./phone-edit/phone-edit.component";

@NgModule({
    imports:      [ CommonModule, FormsModule, HttpModule, Ng2PaginationModule, PhoneRoutingModule ],
    declarations: [ PhoneComponent, PhoneAddComponent, PhoneEditComponent ],
    providers: [ PhoneService ],
    bootstrap: [ ]
})
export class PhoneModule { }