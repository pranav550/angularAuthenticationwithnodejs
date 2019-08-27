import { AuthGuard } from './../guards/auth.guard';
import { HomeComponent } from './../components/home/home.component';
import { RegisterComponent } from './../components/register/register.component';
import { LoginComponent } from './../components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes:Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:''}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
