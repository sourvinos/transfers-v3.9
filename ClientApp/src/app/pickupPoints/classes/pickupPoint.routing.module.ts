import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service'
import { PickupPointFormComponent } from '../user-interface/pickupPoint-form.component'
import { PickupPointFormResolver } from './pickupPoint-form.resolver'
import { PickupPointListComponent } from '../user-interface/pickupPoint-list.component'
import { PickupPointListResolver } from './pickupPoint-list.resolver'
import { PickupPointWrapperComponent } from '../user-interface/pickupPoint-wrapper.component'

const routes: Routes = [
    { path: '', component: PickupPointWrapperComponent, canActivate: [AuthGuardService] },
    { path: 'routeId/:routeId', component: PickupPointListComponent, canActivate: [AuthGuardService], resolve: { pickupPointList: PickupPointListResolver } },
    { path: 'routeId/:routeId/pickupPoint/new', component: PickupPointFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
    { path: 'routeId/:routeId/pickupPoint/:pickupPointId', component: PickupPointFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { pickupPointForm: PickupPointFormResolver } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PickupPointRoutingModule { }