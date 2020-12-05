import { NgModule } from '@angular/core'
import { MaterialModule } from './../../shared/modules/material.module'
import { OverviewDetailsComponent } from '../user-interface/overview-details/overview-details.component'
import { SharedModule } from './../../shared/modules/shared.module'
import { TransferAssignDriverComponent } from '../user-interface/assign-driver/assign-driver-form.component'
import { TransferFormComponent } from '../user-interface/transfer-wrapper/transfer-form.component'
import { TransferListComponent } from '../user-interface/transfer-wrapper/transfer-list.component'
import { TransferOverviewComponent } from '../user-interface/transfer-overview/transfer-overview.component'
import { TransferWrapperComponent } from '../user-interface/transfer-wrapper/transfer-wrapper.component'

@NgModule({
    declarations: [
        TransferWrapperComponent,
        TransferListComponent,
        TransferFormComponent,
        TransferAssignDriverComponent,
        TransferOverviewComponent,
        OverviewDetailsComponent
    ],
    imports: [
        SharedModule,
        MaterialModule
    ],
    entryComponents: [
        TransferAssignDriverComponent
    ]
})

export class TransferModule { }
