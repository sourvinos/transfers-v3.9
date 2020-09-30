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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TransferAssignDriverComponent>) { }

    ngOnInit(): void {
        this.populateDropDowns()
    }

    public onClose(): void {
        this.dialogRef.close()
    }

    private populateDropDowns(): void {
        this.data.drivers.subscribe((result: any) => {
            this.drivers = result.sort((a: { description: number; }, b: { description: number; }) => (a.description > b.description) ? 1 : -1)
        })
    }

}
