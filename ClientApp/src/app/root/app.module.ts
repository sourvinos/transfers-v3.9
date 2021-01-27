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
import { CreditsComponent } from '../credits/user-interface/credits.component'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { HomeComponent } from './../home/home.component'
import { LanguageMenuComponent } from '../shared/components/top-bar-wrapper/top-language-menu/language-menu.component'
import { RecordCountComponent } from '../shared/components/record-count/record-count.component'
import { SideBarComponent } from '../shared/components/side-bar-wrapper/side-bar/side-bar.component'
import { SideFooterComponent } from './../shared/components/side-bar-wrapper/side-footer/side-footer.component'
import { SideImageComponent } from '../shared/components/side-bar-wrapper/side-image/side-image.component'
import { SideLogoComponent } from './../shared/components/side-bar-wrapper/side-logo/side-logo.component'
import { ThemeTogglerComponent } from '../shared/components/top-bar-wrapper/top-theme-menu/theme-menu.component'
import { TopBarComponent } from '../shared/components/top-bar-wrapper/top-bar/top-bar.component'
import { TopLogoComponent } from '../shared/components/top-bar-wrapper/top-logo/top-logo.component'
import { TopMenuComponent } from '../shared/components/top-bar-wrapper/top-menu/top-menu.component'
import { UserMenuComponent } from '../shared/components/top-bar-wrapper/top-user-menu/user-menu.component'

// Utils
import { DomChangeDirective } from '../shared/directives/dom-change.directive'
import { JwtInterceptor } from '../shared/services/jwt.interceptor'

@NgModule({
    declarations: [
        AppComponent,
        DomChangeDirective,
        EmptyPageComponent,
        HomeComponent,
        LanguageMenuComponent,
        RecordCountComponent,
        SideBarComponent,
        SideFooterComponent,
        SideImageComponent,
        SideLogoComponent,
        ThemeTogglerComponent,
        TopBarComponent,
        TopLogoComponent,
        TopMenuComponent,
        UserMenuComponent,
        CreditsComponent
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
