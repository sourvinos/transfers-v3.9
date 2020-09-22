import { Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar'
import { MessageService } from '../../services/message.service'

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.css']
})

export class SnackbarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBar: MatSnackBar, public snackbarMessageService: MessageService) { }

}
