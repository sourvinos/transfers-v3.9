// Base
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Components
import { ChangePasswordFormComponent } from '../users/user-interface/change-password-form.component'
import { CustomerFormComponent } from '../customers/user-interface/customer-form.component'
import { CustomerListComponent } from '../customers/user-interface/customer-list.component'
import { DestinationFormComponent } from '../destinations/user-interface/destination-form.component'
import { DestinationListComponent } from '../destinations/user-interface/destination-list.component'
import { DriverFormComponent } from '../drivers/user-interface/driver-form.component'
import { DriverListComponent } from '../drivers/user-interface/driver-list.component'
import { EditUserFormComponent } from '../users/user-interface/edit-user-form.component'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { ForgotPasswordFormComponent } from '../account/user-interface/forgot-password-form.component'
import { HomeComponent } from '../home/home.component'
import { LoginFormComponent } from '../login/user-interface/login-form.component'
import { PickupPointFormComponent } from '../pickupPoints/user-interface/pickupPoint-form.component'
import { PickupPointListComponent } from '../pickupPoints/user-interface/pickupPoint-list.component'
import { PickupPointWrapperComponent } from '../pickupPoints/user-interface/pickupPoint-wrapper.component'
import { PortFormComponent } from '../ports/user-interface/port-form.component'
import { PortListComponent } from '../ports/user-interface/port-list.component'
import { RegisterUserFormComponent } from '../users/user-interface/register-user-form.component'
import { ResetPasswordFormComponent } from '../account/user-interface/reset-password-form.component'
import { RouteFormComponent } from '../routes/user-interface/route-form.component'
import { RouteListComponent } from '../routes/user-interface/route-list.component'
import { TransferFormComponent } from '../transfers/user-interface/transfer-form.component'
import { TransferListComponent } from '../transfers/user-interface/transfer-list.component'
import { TransferWrapperComponent } from '../transfers/user-interface/transfer-wrapper.component'
import { UserListComponent } from '../users/user-interface/user-list.component'

// List resolvers
import { CustomerFormResolver } from '../customers/classes/customer-form.resolver'
import { CustomerListResolver } from '../customers/classes/customer-list.resolver'
import { DestinationFormResolver } from '../destinations/classes/destination-form.resolver'
import { DestinationListResolver } from '../destinations/classes/destination-list.resolver'
import { DriverFormResolver } from '../drivers/classes/driver-form.resolver'
import { DriverListResolver } from '../drivers/classes/driver-list.resolver'
import { PickupPointFormResolver } from '../pickupPoints/classes/pickupPoint-form.resolver'
import { PickupPointListResolver } from '../pickupPoints/classes/pickupPoint-list.resolver'
import { PortFormResolver } from '../ports/classes/port-form.resolver'
import { PortListResolver } from '../ports/classes/port-list.resolver'
import { RouteFormResolver } from '../routes/classes/route-form.resolver'
import { RouteListResolver } from '../routes/classes/route-list.resolver'
import { TransferFormResolver } from '../transfers/classes/transfer-form.resolver'
import { TransferListResolver } from '../transfers/classes/transfer-list.resolver'
import { UserFormResolver } from '../users/classes/user-form.resolver'
import { UserListResolver } from '../users/classes/user-list.resolver'

// Guards
import { AuthGuardService } from '../shared/services/auth-guard.service'
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuardService], resolve: { customerList: CustomerListResolver } },
    { path: 'customers/new', component: CustomerFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'customers/:id', component: CustomerFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { customerForm: CustomerFormResolver } },
    { path: 'destinations', component: DestinationListComponent, canActivate: [AuthGuardService], resolve: { destinationList: DestinationListResolver } },
    { path: 'destinations/new', component: DestinationFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'destinations/:id', component: DestinationFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { destinationForm: DestinationFormResolver } },
    { path: 'drivers', component: DriverListComponent, canActivate: [AuthGuardService], resolve: { driverList: DriverListResolver } },
    { path: 'drivers/new', component: DriverFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'drivers/:id', component: DriverFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { driverForm: DriverFormResolver } },
    { path: 'pickupPoints', component: PickupPointWrapperComponent, canActivate: [AuthGuardService] },
    { path: 'pickupPoints/routeId/:routeId', component: PickupPointListComponent, canActivate: [AuthGuardService], resolve: { pickupPointList: PickupPointListResolver } },
    { path: 'pickupPoints/routeId/:routeId/pickupPoint/new', component: PickupPointFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'pickupPoints/routeId/:routeId/pickupPoint/:pickupPointId', component: PickupPointFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { pickupPointForm: PickupPointFormResolver } },
    { path: 'ports', component: PortListComponent, canActivate: [AuthGuardService], resolve: { portList: PortListResolver } },
    { path: 'ports/new', component: PortFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'ports/:id', component: PortFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { portForm: PortFormResolver } },
    { path: 'routes', component: RouteListComponent, canActivate: [AuthGuardService], resolve: { routeList: RouteListResolver } },
    { path: 'routes/new', component: RouteFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'routes/:id', component: RouteFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { routeForm: RouteFormResolver } },
    {
        path: 'transfers', component: TransferWrapperComponent, canActivate: [AuthGuardService], children: [
            {
                path: 'date/:dateIn', component: TransferListComponent, canActivate: [AuthGuardService], resolve: { transferList: TransferListResolver }, children: [
                    { path: 'transfer/new', component: TransferFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
                    { path: 'transfer/:id', component: TransferFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { transferForm: TransferFormResolver } }
                ], runGuardsAndResolvers: 'always'
            }]
    },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuardService], resolve: { userList: UserListResolver } },
    { path: 'users/new', component: RegisterUserFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'users/changePassword/:id', component: ChangePasswordFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'users/:id', component: EditUserFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { userForm: UserFormResolver } },
    { path: 'forgotPassword', component: ForgotPasswordFormComponent },
    { path: 'resetPassword', component: ResetPasswordFormComponent },
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
