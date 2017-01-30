import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard} from "../auth/auth.guard";
import { UserComponent } from "./user.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserPassComponent } from "./user-pass/user-pass.component";

const UserRoutes: Routes = [
    { path: '', component: UserComponent, canActivate: [ AuthGuard ] },
    { path: 'add', component: UserAddComponent, canActivate: [ AuthGuard ] },
    { path: 'edit/:id', component: UserEditComponent, canActivate: [ AuthGuard ] },
    { path: 'pass/:id', component: UserPassComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
    imports: [RouterModule.forChild(UserRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }