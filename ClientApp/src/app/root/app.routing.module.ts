// Base
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Components
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { HomeComponent } from '../home/home.component'
import { LoginFormComponent } from '../login/user-interface/login-form.component'

// Guards
import { AuthGuardService } from '../shared/services/auth-guard.service'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'account', loadChildren: (): any => import('../account/classes/account.module').then(m => m.AccountModule) },
    { path: 'customers', loadChildren: (): any => import('../customers/classes/customer.module').then(m => m.CustomerModule) },
    { path: 'destinations', loadChildren: (): any => import('../destinations/classes/destination.module').then(m => m.DestinationModule) },
    { path: 'drivers', loadChildren: (): any => import('../drivers/classes/driver.module').then(m => m.DriverModule) },
    { path: 'pickupPoints', loadChildren: (): any => import('../pickupPoints/classes/pickupPoint.module').then(m => m.PickupPointModule) },
    { path: 'ports', loadChildren: (): any => import('../ports/classes/port.module').then(m => m.PortModule) },
    { path: 'routes', loadChildren: (): any => import('../routes/classes/route.module').then(m => m.RouteModule) },
    { path: 'transfers', loadChildren: (): any => import('../transfers/classes/transfer.module').then(m => m.TransferModule) },
    { path: 'users', loadChildren: (): any => import('../users/classes/user.module').then(m => m.UserModule) },
    { path: '**', component: EmptyPageComponent }
]

@NgModule({
    declarations: [],
    entryComponents: [],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
