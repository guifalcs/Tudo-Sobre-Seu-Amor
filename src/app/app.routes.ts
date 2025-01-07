import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/singup.component';
import { BasicPlanComponent } from './pages/basic-plan/basic-plan.component';
import { RomanticoPlanComponent } from './pages/romantico-plan/romantico-plan.component';
import { ApaixonadoPlanComponent } from './pages/apaixonado-plan/apaixonado-plan.component';
import { InMemoryScrollingOptions } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { SubscriptionGuard } from './guards/subscription.guard';
import { NoSubComponent } from './pages/no-sub/no-sub.component';
import { AllPlansComponent } from './pages/all-plans/all-plans.component';
import { RelationshipGuard } from './guards/relationship.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'plans/basico', component: BasicPlanComponent },
  { path: 'plans/romantico', component: RomanticoPlanComponent },
  // { path: 'plans/apaixonado', component: ApaixonadoPlanComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/plan/plan.component').then(m => m.PlanComponent),
    canActivate: [AuthGuard, SubscriptionGuard, RelationshipGuard],
  },
  { path: 'contato', component: ContactComponent },
  { path: 'getSub', component: NoSubComponent },
  { path: 'plans', component: AllPlansComponent },
  {
    path: 'setup-relationship',
    loadComponent: () => import('./pages/setup-relationship/setup-relationship.component').then(m => m.SetupRelationshipComponent),
    canActivate: [AuthGuard, SubscriptionGuard],
  },
];

export const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};


