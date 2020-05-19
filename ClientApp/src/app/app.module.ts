import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserIdleModule.forRoot({ idle: 60, timeout: 120, ping: 60 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
