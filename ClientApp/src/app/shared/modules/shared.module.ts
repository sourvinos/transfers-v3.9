import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { InputFormatDirective } from 'src/app/shared/directives/input-format.directive'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'
import { DialogIndexComponent } from '../components/dialog-index/dialog-index.component'
import { DialogSimpleComponent } from '../components/dialog-simple/dialog-simple.component'
import { SnackbarComponent } from '../components/snackbar/snackbar.component'
import { CustomTableComponent } from '../components/table/custom-table.component'
import { SafeStylePipe } from '../pipes/safeStyle.pipe'
import { MaterialModule } from './material.module'

@NgModule({
        declarations: [
                CustomTableComponent,
                DialogAlertComponent,
                DialogIndexComponent,
                DialogSimpleComponent,
                SnackbarComponent,
                InputFormatDirective,
                InputTabStopDirective,
                SafeStylePipe,
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
                CustomTableComponent,
                InputFormatDirective,
                InputTabStopDirective,
                RouterModule
        ],
        entryComponents: [
                DialogAlertComponent,
                DialogIndexComponent,
                DialogSimpleComponent,
                SnackbarComponent
        ]
})

export class SharedModule { }
