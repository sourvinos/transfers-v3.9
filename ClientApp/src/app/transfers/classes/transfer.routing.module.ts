import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service'
import { TransferFormComponent } from '../user-interface/transfer-wrapper/transfer-form.component'
import { TransferFormResolver } from './transfer-form.resolver'
import { TransferListComponent } from '../user-interface/transfer-wrapper/transfer-list.component'
import { TransferListResolver } from './transfer-list.resolver'
import { TransferOverviewComponent } from '../user-interface/transfer-overview/transfer-overview.component'
import { TransferWrapperComponent } from '../user-interface/transfer-wrapper/transfer-wrapper.component'

const routes: Routes = [
    {
        path: '', component: TransferWrapperComponent, canActivate: [AuthGuardService], children: [
            {
                path: 'date/:dateIn', component: TransferListComponent, canActivate: [AuthGuardService], resolve: { transferList: TransferListResolver }, children: [
                    { path: 'transfer/new', component: TransferFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
                    { path: 'transfer/:id', component: TransferFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { transferForm: TransferFormResolver } }
                ], runGuardsAndResolvers: 'always'
            }]
    },
    {
        path: 'overview', component: TransferOverviewComponent, canActivate: [AuthGuardService]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TransferRoutingModule { }