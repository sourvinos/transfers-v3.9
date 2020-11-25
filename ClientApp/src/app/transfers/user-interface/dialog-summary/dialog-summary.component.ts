import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subject } from 'rxjs'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'

@Component({
    selector: 'dialog-summary',
    templateUrl: './dialog-summary.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css', './dialog-summary.component.css']
})

export class DialogSummaryComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>();
    public feature = 'dialogSimple'
    public header: string
    public records: any[]
    public sortOrder = 'desc'

    //#endregion

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
         public dialogRef: MatDialogRef<DialogSummaryComponent>,
         private messageLabelService: MessageLabelService,
         
         ) {
        this.header = data.header
        this.records = data.records
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

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onHeaderClick(columnName: string, sortOrder: string): void {
        this.records.sort(this.compareValues(columnName, sortOrder))
        this.sortOrder = this.sortOrder === 'asc' ? this.sortOrder = 'desc' : this.sortOrder = 'asc'
    }

    private compareValues(key: string, order = 'asc'): any {
        return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: string) => any }, b: { [x: string]: any; hasOwnProperty: (arg0: string) => any }): number {
            if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) { return 0 }
            let comparison = 0
            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
            comparison = varA > varB ? 1 : -1
            return ((order === 'desc') ? (comparison * -1) : comparison)
        }
    }

}
