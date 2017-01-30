import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

import {DepartmentComponent} from "./department.component";
import {InformationComponent} from "./information/information.component";
import {AuthGuard} from "../auth/auth.guard";
import {DepartmentAddComponent} from "./department-add/department-add.component";
import {DepartmentEditComponent} from "./department-edit/department-edit.component";
import {InformationAddComponent} from "./information/information-add/information-add.component";
import {InformationEditComponent} from "./information/information-edit/information-edit.component";

const DepartmentRoutes: Routes = [
    { path: '', component: DepartmentComponent, canActivate: [ AuthGuard ] },
    { path: 'add', component: DepartmentAddComponent, canActivate: [ AuthGuard ] },
    { path: 'edit/:id', component: DepartmentEditComponent, canActivate: [ AuthGuard ] },
    { path: 'info/:id', component: InformationComponent, canActivate: [ AuthGuard ] },
    { path: 'info/add/:id', component: InformationAddComponent, canActivate: [ AuthGuard ] },
    { path: 'info/edit/:id/:idinfo', component: InformationEditComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
    imports: [RouterModule.forChild(DepartmentRoutes)],
    exports: [RouterModule]
})

export class DepartmentRoutingModule { }