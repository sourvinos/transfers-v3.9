import { NgModule } from '@angular/core'
import { PickupPointFormComponent } from '../user-interface/pickupPoint-form.component'
import { PickupPointListComponent } from '../user-interface/pickupPoint-list.component'
import { PickupPointWrapperComponent } from '../user-interface/pickupPoint-wrapper.component'
import { MaterialModule } from './../../shared/modules/material.module'
import { SharedModule } from './../../shared/modules/shared.module'

@NgModule({
    declarations: [
        PickupPointWrapperComponent,
        PickupPointListComponent,
        PickupPointFormComponent,
    ],
    imports: [
        SharedModule,
        MaterialModule
    ]
})

export class PickupPointModule { }
