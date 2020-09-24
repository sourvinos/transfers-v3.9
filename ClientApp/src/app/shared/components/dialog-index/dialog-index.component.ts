import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { IndexInteractionService } from '../../services/index-interaction.service'

@Component({
    selector: 'dialog-index',
    templateUrl: './dialog-index.component.html',
    styleUrls: ['../../../../assets/styles/dialogs.css']
})

export class DialogIndexComponent implements OnInit, OnDestroy {

    //#region variables

    title: string
    fields: any[]
    headers: any[]
    justify: any[]
    visibility: any[]
    widths: any[]
    records: any[]
    selectedRecord: any
    ngUnsubscribe = new Subject<void>();

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private indexInteractionService: IndexInteractionService, public dialogRef: MatDialogRef<DialogIndexComponent>) {
        this.title = data.title
        this.fields = data.fields
        this.headers = data.headers
        this.justify = data.justify
        this.visibility = data.visibility
        this.widths = data.widths
        this.records = data.records
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.subscribeToIndexinteractionService()
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    //#endregion

    //#region private methods

    private subscribeToIndexinteractionService(): void {
        this.indexInteractionService.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
            this.selectedRecord = response
            this.indexInteractionService.dialogMustClose.subscribe(x => {
                if (x) {
                    this.dialogRef.close(this.selectedRecord)
                }
            })
        })
    }

    //#endregion

}
