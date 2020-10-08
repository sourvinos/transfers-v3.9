import { NgModule } from '@angular/core'
import { MaterialModule } from '../../shared/modules/material.module'
import { SharedModule } from '../../shared/modules/shared.module'
import { ChangePasswordFormComponent } from '../user-interface/change-password-form.component'
import { RegisterUserFormComponent } from '../user-interface/register-user-form.component'
import { UserListComponent } from '../user-interface/user-list.component'
import { EditUserFormComponent } from '../user-interface/edit-user-form.component'

@NgModule({
    declarations: [
        UserListComponent,
        RegisterUserFormComponent,
        EditUserFormComponent,
        ChangePasswordFormComponent
    ],
    imports: [
        SharedModule,
        MaterialModule
    ]
})

export class UserModule { }
