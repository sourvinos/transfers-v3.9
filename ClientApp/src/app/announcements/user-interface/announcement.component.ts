import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'

@Component({
    selector: 'announcements',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent {

    //#region variables

    private firstRead: boolean
    public difference = 0
    public loginStatus: boolean

    //#endregion

    constructor(private accountService: AccountService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.firstRead = true
        this.accountService.isLoggedIn.subscribe(result => {
            this.loginStatus = result
        })
    }

    //#endregion

    //#region public methods

    public onResetRecordCount(): void {
        this.firstRead = true
    }

    //#endregion

}
