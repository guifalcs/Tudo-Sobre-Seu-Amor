import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanComponent } from './pages/plan/plan.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/singup.component';
import { BasicPlanComponent } from './pages/basic-plan/basic-plan.component';
import { RomanticoPlanComponent } from './pages/romantico-plan/romantico-plan.component';
import { ApaixonadoPlanComponent } from './pages/apaixonado-plan/apaixonado-plan.component';
import { InMemoryScrollingOptions } from '@angular/router';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'plan', component: PlanComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'plans/basico', component: BasicPlanComponent },
  { path: 'plans/romantico', component: RomanticoPlanComponent },
  { path: 'plans/apaixonado', component: ApaixonadoPlanComponent }
];

export const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};
