import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// component imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ProfileComponent } from './profile/profile.component';

// auth services
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

// store
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(reducer)
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
