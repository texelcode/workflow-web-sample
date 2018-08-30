import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { LoginRedirectService } from './services/login-redirect.service';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';
import { ApprovalListComponent } from './components/approval-list/approval-list.component';
import { ApprovalAddComponent } from './components/approval-add/approval-add.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ApprovalComponent } from './components/approval/approval.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '#',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'logout',
    component: LoginComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: 'connection',
    component: ConnectionComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'home',
    component: HomeComponent,
    // loadChildren: './modules/home/home.module#HomeModule',
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'inbox',
    component: InboxListComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'inbox/:id',
    component: InboxComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'user',
    component: UserListComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'add-user',
    component: UserAddComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'approval',
    component: ApprovalListComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'approval/:id',
    component: ApprovalComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'add-approval',
    component: ApprovalAddComponent,
    canActivate:
    [EnsureAuthenticatedService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:
    [EnsureAuthenticatedService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [
    EnsureAuthenticatedService,
    LoginRedirectService]
})
export class AppRoutingModule { }
