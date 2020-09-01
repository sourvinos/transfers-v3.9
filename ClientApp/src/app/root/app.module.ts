// Base
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app.routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ScrollingModule } from '@angular/cdk/scrolling'

// Modules
import { AccountModule } from './../account/classes/account.module'
import { CustomerModule } from '../customers/classes/customer.module'
import { DestinationModule } from '../destinations/classes/destination.module'
import { DriverModule } from '../drivers/classes/driver.module'
import { LoginModule } from './../login/classes/login.module'
import { MaterialModule } from '../shared/modules/material.module'
import { PickupPointModule } from '../pickupPoints/classes/pickupPoint.module'
import { PortModule } from '../ports/classes/port.module'
import { RouteModule } from '../routes/classes/route.module'
import { TransferModule } from './../transfers/classes/transfer.module'
import { UserIdleModule } from 'angular-user-idle'
import { UserModule } from '../users/classes/user.module'

// Components
import { AppComponent } from './app.component'
import { DoubleRingComponent } from './../shared/components/double-ring/double-ring.component'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { HomeComponent } from './../home/home.component'
import { LanguageBarComponent } from '../shared/components/language-bar/language-bar.component'
import { MainComponent } from './../shared/components/main/main.component'
import { NavNarrowComponent } from '../shared/components/nav/nav-narrow/nav-narrow.component'
import { NavWideComponent } from '../shared/components/nav/nav-wide/nav-wide.component'
import { NavWrapperComponent } from '../shared/components/nav/nav-wrapper/nav-wrapper.component'
import { ThemeTogglerComponent } from './../shared/components/themeToggler/themeToggler.component'

// Utils
import { JwtInterceptor } from '../shared/services/jwt.interceptor'
import { DomChangeDirective } from '../shared/directives/dom-change.directive'

@NgModule({
    declarations: [
        AppComponent,
        DomChangeDirective,
        DoubleRingComponent,
        EmptyPageComponent,
        HomeComponent,
        LanguageBarComponent,
        MainComponent,
        NavNarrowComponent,
        NavNarrowComponent,
        NavWideComponent,
        NavWideComponent,
        NavWrapperComponent,
        NavWrapperComponent,
        ThemeTogglerComponent
    ],
    imports: [
        AccountModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CustomerModule,
        DestinationModule,
        DriverModule,
        FormsModule,
        HttpClientModule,
        LoginModule,
        MaterialModule,
        PickupPointModule,
        PortModule,
        ReactiveFormsModule,
        RouteModule,
        ScrollingModule,
        TransferModule,
        UserModule,
        UserIdleModule.forRoot({ idle: 3600, timeout: 60, ping: 60 })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
