import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'dialog-alert',
    templateUrl: './dialog-alert.component.html',
    styleUrls: ['../../styles/dialogs.css']
})

export class DialogAlertComponent {

    public titleColor = ''

    constructor(private dialogRef: MatDialogRef<DialogAlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        switch (data.titleColor) {
            case 'warningColor':
                this.titleColor = '#fe9f36'
                break
            case 'importantColor':
                this.titleColor = '#0c5e71'
                break
            default:
                break
        }
    }

    onClose(): void {
        this.dialogRef.close()
    }

}
