import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { DestinationService } from 'src/app/destinations/classes/destination.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'

@Component({
    selector: 'record-count',
    templateUrl: './record-count.component.html',
    styleUrls: ['./record-count.component.css']
})

export class RecordCountComponent {

    //#region variables

    public firstRead: boolean
    public difference = 0
    public latest: number
    public loginStatus: boolean

    //#endregion

    constructor(private accountService: AccountService, private destinationService: DestinationService, private interactionService: InteractionService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.firstRead = true
        this.accountService.isLoggedIn.subscribe(result => {
            this.loginStatus = result
        })
    }

    ngDoCheck(): void {
        if (this.loginStatus) {
            if (this.firstRead) {
                this.destinationService.getCount().subscribe(result => {
                    this.firstRead = false
                    this.latest = result
                    this.difference = 0
                })
            } else {
                this.interactionService.recordCount.subscribe(result => {
                    this.difference = result - this.latest < 0 ? 0 : result - this.latest
                })
            }
        }
    }

    //#endregion

    //#region public methods

    public onResetRecordCount(): void {
        this.firstRead = true
    }

    //#endregion

}
