import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from "./auth.component";

const AuthRoutes: Routes = [
    { path: 'login', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(AuthRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }