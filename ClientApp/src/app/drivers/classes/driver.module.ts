import { NgModule } from '@angular/core'
import { MaterialModule } from '../../shared/modules/material.module'
import { SharedModule } from '../../shared/modules/shared.module'
import { DriverFormComponent } from '../user-interface/driver-form.component'
import { DriverListComponent } from '../user-interface/driver-list.component'

@NgModule({
    declarations: [
        DriverListComponent,
        DriverFormComponent
    ],
    imports: [
        SharedModule,
        MaterialModule
    ]
})

export class DriverModule { }
