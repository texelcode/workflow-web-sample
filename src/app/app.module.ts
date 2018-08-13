import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
    BsDropdownModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    CollapseModule.forRoot()
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
    UserAddComponent
  ],
  providers: [
    EnsureAuthenticatedService,
    LoginRedirectService,
    ErrorHandlerService,
    ConnectionService,
    UserService,
    InboxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
