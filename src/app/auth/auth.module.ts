import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { Ng2PaginationModule } from "ng2-pagination";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from './auth.guard';

import { AuthRoutingModule } from "./auth.routing.module"
import { AuthService } from "./auth.service";

@NgModule({
    imports:      [ CommonModule, FormsModule, HttpModule, Ng2PaginationModule, AuthRoutingModule ],
    declarations: [ AuthComponent ],
    providers: [ AuthService, AuthGuard ],
    bootstrap:    [ ]
})
export class AuthModule { }