import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule, TabsModule } from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ClickOutsideModule } from 'ng-click-outside';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SubmittedApprovalComponent } from './components/submitted-approval/submitted-approval.component';
import { ApprovalComponent } from './components/approval/approval.component';
import { UserComponent } from './components/user/user.component';
import { SubmitComponent } from './components/submit/submit.component';
import { HomeComponent } from './components/home/home.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ConnectionService } from './services/connection.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { LoginRedirectService } from './services/login-redirect.service';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InboxService } from './services/inbox.service';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';
import { ApprovalListComponent } from './components/approval-list/approval-list.component';
import { ApprovalAddComponent } from './components/approval-add/approval-add.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResponsiveModule } from 'ngx-responsive';
import { EventService } from './services/event.service';
import { IdleService } from './services/idle.service';
import { InboxNotifierComponent } from './components/inbox-notifier/inbox-notifier.component';
import { AdminComponent } from './components/admin/admin.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 0
    },
    vertical: {
      position: 'bottom',
      distance: 0,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 5
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
const config = {
  breakPoints: {
      xs: {max: 600},
      sm: {min: 601, max: 959},
      md: {min: 960, max: 1279},
      lg: {min: 1280, max: 1919},
      xl: {min: 1920}
  },
  debounceTime: 100
};
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgSelectModule,
    NgxPaginationModule,
    NgxDatatableModule,
    ClickOutsideModule,
    NotifierModule.withConfig(customNotifierOptions),
    TabsModule.forRoot(),
    ResponsiveModule.forRoot(config),
    NgxMyDatePickerModule.forRoot(),
    CollapseModule.forRoot(),
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    UserListComponent,
    SubmittedApprovalComponent,
    ApprovalComponent,
    UserComponent,
    SubmitComponent,
    HomeComponent,
    RecipientComponent,
    ConnectionComponent,
    LoginComponent,
    RegisterComponent,
    InboxComponent,
    HeaderComponent,
    FooterComponent,
    InboxListComponent,
    ApprovalListComponent,
    ApprovalAddComponent,
    UserAddComponent,
    SidebarComponent,
    InboxNotifierComponent,
    AdminComponent
  ],
  providers: [
    EnsureAuthenticatedService,
    LoginRedirectService,
    ErrorHandlerService,
    ConnectionService,
    UserService,
    InboxService,
    EventService,
    IdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
