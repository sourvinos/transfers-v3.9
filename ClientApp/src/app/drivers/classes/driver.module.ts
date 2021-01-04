import { NgModule } from '@angular/core'

import { DriverFormComponent } from '../user-interface/driver-form.component'
import { DriverListComponent } from '../user-interface/driver-list.component'
import { DriverRoutingModule } from './driver.routing.module'
import { MaterialModule } from '../../shared/modules/material.module'
import { SharedModule } from '../../shared/modules/shared.module'

@NgModule({
    declarations: [
        DriverListComponent,
        DriverFormComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        DriverRoutingModule
    ]
})

export class DriverModule { }
