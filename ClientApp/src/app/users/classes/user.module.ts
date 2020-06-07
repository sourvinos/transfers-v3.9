import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { ChangePasswordFormComponent } from '../user-interface/change-password-form';
import { RegisterUserFormComponent } from '../user-interface/register-user-form';
import { UserListComponent } from '../user-interface/user-list';
import { EditUserFormComponent } from './../user-interface/edit-user-form';

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
