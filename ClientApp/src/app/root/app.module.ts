import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserIdleModule } from 'angular-user-idle';
import { CustomerModule } from '../customers/classes/customer.module';
import { DestinationModule } from '../destinations/classes/destination.module';
import { DriverModule } from '../drivers/classes/driver.module';
import { PickupPointModule } from '../pickupPoints/classes/pickupPoint.module';
import { PortModule } from '../ports/classes/port.module';
import { RouteModule } from '../routes/classes/route.module';
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { DomChangeDirective } from '../shared/directives/dom-change.directive';
import { MaterialModule } from '../shared/modules/material.module';
import { JwtInterceptor } from '../shared/services/jwt.interceptor';
import { UserModule } from '../users/classes/user.module';
import { AccountModule } from './../account/classes/account.module';
import { HomeComponent } from './../home/home.component';
import { LoginModule } from './../login/classes/login.module';
import { DoubleRingComponent } from './../shared/components/double-ring/double-ring.component';
import { LoaderComponent } from './../shared/components/loader/loader.component';
import { MainComponent } from './../shared/components/main/main.component';
import { TransferModule } from './../transfers/classes/transfer.module';
import { AppRouting } from './app.routing';
import { RootComponent } from './root.component';

@NgModule({
    declarations: [
        MainComponent,
        RootComponent,
        HomeComponent,
        LoaderComponent,
        SidebarComponent,
        DoubleRingComponent,
        DomChangeDirective,
        EmptyPageComponent
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
