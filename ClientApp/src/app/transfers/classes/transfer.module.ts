import { NgModule } from '@angular/core'
import { TransferAssignDriverComponent } from '../user-interface/transfer-assign-driver'
import { TransferFormComponent } from '../user-interface/transfer-form'
import { TransferListComponent } from '../user-interface/transfer-list'
import { TransferWrapperComponent } from '../user-interface/transfer-wrapper'
import { MaterialModule } from './../../shared/modules/material.module'
import { SharedModule } from './../../shared/modules/shared.module'

@NgModule({
    declarations: [
        TransferWrapperComponent,
        TransferListComponent,
        TransferFormComponent,
        TransferAssignDriverComponent
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
