import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomTableComponent } from '../components/table/custom-table.component'
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'
import { DialogIndexComponent } from '../components/dialog-index/dialog-index.component'
import { FormatNumberPipe } from '../pipes/format-number.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputFormatDirective } from 'src/app/shared/directives/input-format.directive'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { SafeStylePipe } from '../pipes/safeStyle.pipe'
import { SnackbarComponent } from '../components/snackbar/snackbar.component'

@NgModule({
    declarations: [
        CustomTableComponent,
        DialogAlertComponent,
        DialogIndexComponent,
        InputFormatDirective,
        InputTabStopDirective,
        SnackbarComponent,
        FormatNumberPipe,
        SafeStylePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CustomTableComponent,
        InputFormatDirective,
        InputTabStopDirective,
        FormatNumberPipe
    ],
    entryComponents: [
        DialogAlertComponent,
        DialogIndexComponent,
        SnackbarComponent
    ]
})

export class SharedModule { }
