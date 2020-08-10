import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRouting } from './app.routing'

import { AccountModule } from './../account/classes/account.module'
import { CustomerModule } from '../customers/classes/customer.module'
import { DestinationModule } from '../destinations/classes/destination.module'
import { DomChangeDirective } from '../shared/directives/dom-change.directive'
import { DoubleRingComponent } from './../shared/components/double-ring/double-ring.component'
import { DriverModule } from '../drivers/classes/driver.module'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { HomeComponent } from './../home/home.component'
import { JwtInterceptor } from '../shared/services/jwt.interceptor'
import { LoaderComponent } from './../shared/components/loader/loader.component'
import { LoginModule } from './../login/classes/login.module'
import { MainComponent } from './../shared/components/main/main.component'
import { MaterialModule } from '../shared/modules/material.module'
import { PickupPointModule } from '../pickupPoints/classes/pickupPoint.module'
import { PortModule } from '../ports/classes/port.module'
import { RootComponent } from './root.component'
import { RouteModule } from '../routes/classes/route.module'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { SidebarNarrowComponent } from '../shared/components/sidebar/sidebar-narrow/sidebar-narrow.component'
import { SidebarWideComponent } from '../shared/components/sidebar/sidebar-wide/sidebar-wide.component'
import { SidebarWrapperComponent } from '../shared/components/sidebar/sidebar-wrapper/sidebar-wrapper.component'
import { TransferModule } from './../transfers/classes/transfer.module'
import { UserIdleModule } from 'angular-user-idle'
import { UserModule } from '../users/classes/user.module'

@NgModule({
    declarations: [
        DomChangeDirective,
        DoubleRingComponent,
        EmptyPageComponent,
        HomeComponent,
        LoaderComponent,
        MainComponent,
        RootComponent,
        SidebarWrapperComponent,
        SidebarWideComponent,
        SidebarNarrowComponent,
    ],
    imports: [
        AppRouting,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ScrollingModule,
        MaterialModule,
        AccountModule,
        CustomerModule,
        DestinationModule,
        DriverModule,
        LoginModule,
        PickupPointModule,
        PortModule,
        RouteModule,
        TransferModule,
        UserModule,
        UserIdleModule.forRoot({ idle: 3600, timeout: 60, ping: 60 })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [RootComponent]
})

export class AppModule { }
