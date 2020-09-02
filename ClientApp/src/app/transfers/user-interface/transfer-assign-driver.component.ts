import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Driver } from 'src/app/drivers/classes/driver'

@Component({
    selector: 'transfer-assign-driver',
    templateUrl: './transfer-assign-driver.component.html',
    styleUrls: ['../../../assets/styles/dialogs.css', './transfer-assign-driver.component.css']
})

export class TransferAssignDriverComponent implements OnInit {

    //#region

    drivers: Driver[] = []
    id = ''

    //#endregion

    constructor(private dialogRef: MatDialogRef<TransferAssignDriverComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
        this.populateDropDowns()
    }

    public onClose() {
        this.dialogRef.close()
    }

    private populateDropDowns() {
        this.data.drivers.subscribe((result: any) => {
            this.drivers = result.sort((a: { description: number; }, b: { description: number; }) => (a.description > b.description) ? 1 : -1)
        })
    }

}
