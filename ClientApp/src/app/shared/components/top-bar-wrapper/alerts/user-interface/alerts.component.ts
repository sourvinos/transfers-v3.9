import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})

export class AlertsComponent {

    //#region variables

    public loginStatus: boolean
    public unreadNotifications = 0

    //#endregion

    constructor(private accountService: AccountService, private interactionService: InteractionService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.accountService.isLoggedIn.subscribe(result => {
            this.loginStatus = result
        })
        this.interactionService.recordCount.subscribe(response => {
            this.unreadNotifications = response
        })
    }

    //#endregion

    //#region public methods

    public onResetRecordCount(): void {
        // TODO: Set unread notifications to zero
    }

    //#endregion

}
