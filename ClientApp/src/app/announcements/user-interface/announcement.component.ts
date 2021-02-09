import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { Announcement } from '../classes/announcement'
import { AnnouncementService } from '../classes/announcement.service'

@Component({
    selector: 'announcements',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent {

    //#region variables

    private announcement = new Announcement()
    private firstRead: boolean
    public difference = 0
    public loginStatus: boolean

    //#endregion

    constructor(private accountService: AccountService, private announcementService: AnnouncementService, private helperService: HelperService, private interactionService: InteractionService) { }

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
                this.firstRead = false
                this.announcementService.getCount().subscribe((result) => {
                    this.announcement = result
                    this.difference = this.announcement.unread
                })
            } else {
                this.interactionService.recordCount.subscribe(result => {
                    this.difference = result
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
