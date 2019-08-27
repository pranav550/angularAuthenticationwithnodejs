import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    AuthService,
    CookieService ,
    TokenService,
     { 
       provide: HTTP_INTERCEPTORS,
       useClass: TokenInterceptor,
        multi: true
       },],
  bootstrap: [AppComponent]
})
export class AppModule { }
