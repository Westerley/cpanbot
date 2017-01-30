import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from "../auth/auth.guard";
import {PhoneComponent} from "./phone.component";
import {PhoneAddComponent} from "./phone-add/phone-add.component";
import {PhoneEditComponent} from "./phone-edit/phone-edit.component";

const PhoneRoutes: Routes = [
    { path: '', component: PhoneComponent, canActivate: [ AuthGuard ] },
    { path: 'add', component: PhoneAddComponent, canActivate: [ AuthGuard ] },
    { path: 'edit/:id', component: PhoneEditComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
    imports: [RouterModule.forChild(PhoneRoutes)],
    exports: [RouterModule]
})

export class PhoneRoutingModule { }