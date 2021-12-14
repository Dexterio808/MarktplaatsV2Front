import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GebruikerFormulierComponent } from './components/gebruiker-formulier/gebruiker-formulier.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {JwtInterceptor} from "./util/jwt.interceptor";
import {ProductFormulierComponent} from "./components/product-formulier.component/product-formulier.component";
import {ProductListComponent} from "./components/product-list.component/product-list.component";
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    GebruikerFormulierComponent,
    LoginComponent,
    ProductFormulierComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'gebruikers', component: GebruikerFormulierComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'producten', component: ProductFormulierComponent, // has children, so needs to have a router-outlet!
        children: [{
          path: ':id', component: ProductDetailComponent
        }]
      },
      {path: 'productdetails/:id', component: ProductDetailComponent},
    ])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
