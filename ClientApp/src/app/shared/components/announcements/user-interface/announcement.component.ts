import { Announcement } from './../classes/announcement'
import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'

@Component({
    selector: 'announcement',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent {

    //#region variables

    public loginStatus: boolean
    public announcements: Announcement[] = []

    //#endregion

    constructor(private accountService: AccountService, private interactionService: InteractionService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.accountService.isLoggedIn.subscribe(result => {
            this.loginStatus = result
        })
        this.interactionService.recordCount.subscribe(response => {
            this.announcements = response
            console.log('From service', this.announcements)
        })
    }

    //#endregion

    //#region public methods

    public onResetRecordCount(): void {
        // TODO: Set unread notifications to zero
    }

    //#endregion

}
