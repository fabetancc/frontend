import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signup',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: AuthComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  }
];
