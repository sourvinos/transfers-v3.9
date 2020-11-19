import { NgModule } from '@angular/core'
import { TransferAssignDriverComponent } from '../user-interface/assign-driver-form.component'
import { TransferFormComponent } from '../user-interface/transfer-form.component'
import { TransferListComponent } from '../user-interface/transfer-list.component'
import { TransferOverviewWrapperComponent } from '../user-interface/transfer-overview-wrapper.component'
import { TransferWrapperComponent } from '../user-interface/transfer-wrapper.component'
import { MaterialModule } from './../../shared/modules/material.module'
import { SharedModule } from './../../shared/modules/shared.module'

@NgModule({
    declarations: [
        TransferWrapperComponent,
        TransferListComponent,
        TransferFormComponent,
        TransferAssignDriverComponent,
        TransferOverviewWrapperComponent
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
