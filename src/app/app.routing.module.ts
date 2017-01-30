import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

import {HomeComponent} from "./home/home.component";
import {HomeEditComponent} from "./home/home-edit/home-edit.component";
import {NewsComponent} from "./news/news.component";

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'department', loadChildren: 'app/department/department.module#DepartmentModule'},
    { path: 'coordination', loadChildren: 'app/coordination/coordination.module#CoordinationModule' },
    { path: 'phone', loadChildren: 'app/phone/phone.module#PhoneModule' },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
    { path: 'news', component: NewsComponent, canActivate: [ AuthGuard ] },
    { path: 'home/edit/:id', component: HomeEditComponent, canActivate: [ AuthGuard ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }