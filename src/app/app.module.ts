import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from "./app.routing.module";
import { AuthModule } from "./auth/auth.module"

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeEditComponent } from "./home/home-edit/home-edit.component";
import { NewsComponent } from './news/news.component';

import { HomeService } from './home/home.service'
import { NewsService } from './news/news.service';
import { AuthGuard } from './auth/auth.guard';
import { Ng2PaginationModule } from "ng2-pagination";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule, Ng2PaginationModule, AuthModule ],
  declarations: [ AppComponent, HomeComponent, NewsComponent, HomeEditComponent ],
  providers: [ NewsService, HomeService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
