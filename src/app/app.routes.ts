import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanComponent } from './pages/plan/plan.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/singup.component';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'plan', component: PlanComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
