import { NgModule } from '@angular/core'
import { TransferFormComponent } from '../user-interface/transfer-wrapper/transfer-form.component'
import { TransferListComponent } from '../user-interface/transfer-wrapper/transfer-list.component'
import { TransferWrapperComponent } from '../user-interface/transfer-wrapper/transfer-wrapper.component'
import { MaterialModule } from './../../shared/modules/material.module'
import { SharedModule } from './../../shared/modules/shared.module'
import { TransferAssignDriverComponent } from '../user-interface/assign-driver/assign-driver-form.component'
import { TransferOverviewComponent } from '../user-interface/transfer-overview/transfer-overview.component'

@NgModule({
    declarations: [
        TransferWrapperComponent,
        TransferListComponent,
        TransferFormComponent,
        TransferAssignDriverComponent,
        TransferOverviewComponent
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
