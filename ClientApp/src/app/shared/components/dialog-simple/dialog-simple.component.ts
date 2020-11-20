import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subject } from 'rxjs'

@Component({
    selector: 'dialog-simple',
    templateUrl: './dialog-simple.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css', './dialog-simple.component.css']
})

export class DialogSimpleComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>();
    public header: string
    public fields: any[]

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogSimpleComponent>) {
        this.header = data.header
        this.fields = data.records
    }

    //#region lifecycle hooks

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    //#endregion

    //#region public methods

    public onCloseDialog(): void {
        this.dialogRef.close()
    }

    //#endregion

    //#region private methods

    //#endregion

}
