import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard} from "../auth/auth.guard";
import { CoordinationComponent } from "./coordination.component"
import { CoordinationEditComponent } from "./coordination-edit/coordination-edit.component"
import { CoordinationAddComponent } from "./coordination-add/coordination-add.component";

const CoordinationRoutes: Routes = [
    { path: '', component: CoordinationComponent, canActivate: [ AuthGuard ] },
    { path: 'add', component: CoordinationAddComponent, canActivate: [ AuthGuard ] },
    { path: 'edit/:id', component: CoordinationEditComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
    imports: [RouterModule.forChild(CoordinationRoutes)],
    exports: [RouterModule]
})

export class CoordinationRoutingModule { }