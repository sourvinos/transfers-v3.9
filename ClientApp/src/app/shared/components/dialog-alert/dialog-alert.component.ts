import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MessageLabelService } from '../../services/messages-label.service'

@Component({
    selector: 'dialog-alert',
    templateUrl: './dialog-alert.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css']
})

export class DialogAlertComponent {

    titleColor = ''
    feature = 'dialog'

    constructor(private messageLabelService: MessageLabelService, private dialogRef: MatDialogRef<DialogAlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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

    onClose() {
        this.dialogRef.close()
    }

    public onGetLabel(id: string) {
        return this.messageLabelService.getDescription(this.feature, id)
    }

}
