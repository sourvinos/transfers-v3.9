import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { TransferPersonsPerDate } from 'src/app/transfers/classes/transfer-persons-per-date'

@Component({
    selector: 'announcement',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent {

    //#region variables

    public color = 'alternate'
    public loginStatus: boolean
    public transferPersonsPerDate: TransferPersonsPerDate[] = [{ 'dateIn': '', 'persons': 0 }]

    //#endregion

    constructor(private accountService: AccountService, private interactionService: InteractionService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.accountService.isLoggedIn.subscribe(result => {
            this.loginStatus = result
        })
        this.interactionService.recordCount.subscribe(response => {
            if (this.transferPersonsPerDate[0].persons != response[0].persons) {
                this.color = 'alternate'
                setTimeout(() => {
                    this.color = 'normal'
                }, 1000)
            }
            this.transferPersonsPerDate = response
        })
    }

    //#endregion

}
