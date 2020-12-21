import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomTableComponent } from '../components/table/custom-table.component'
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'
import { DialogIndexComponent } from '../components/dialog-index/dialog-index.component'
import { FormatNumberPipe } from '../pipes/format-number.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputFormatDirective } from 'src/app/shared/directives/input-format.directive'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MapComponent } from '../components/map/map.component'
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { SafeStylePipe } from '../pipes/safeStyle.pipe'
import { SnackbarComponent } from '../components/snackbar/snackbar.component'

@NgModule({
    declarations: [
        CustomTableComponent,
        DialogAlertComponent,
        DialogIndexComponent,
        FormatNumberPipe,
        InputFormatDirective,
        InputTabStopDirective,
        MapComponent,
        SafeStylePipe,
        SnackbarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        CustomTableComponent,
        FormatNumberPipe,
        FormsModule,
        InputFormatDirective,
        InputTabStopDirective,
        MapComponent,
        ReactiveFormsModule,
        RouterModule,
    ],
    entryComponents: [
        DialogAlertComponent,
        DialogIndexComponent,
        SnackbarComponent
    ]
})

export class SharedModule { }
