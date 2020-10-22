import { Component } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { MessageLabelService } from '../../services/messages-label.service'
import { HelperService } from '../../services/helper.service'

@Component({
    selector: 'user-greeting',
    templateUrl: './user-greeting.component.html',
    styleUrls: ['./user-greeting.component.css']
})

export class UserGreetingComponent {

    //#region variables

    private feature = 'userMenu'
    private baseUrl = '/users'
    public displayName: Observable<string>
    public editUserLink: Observable<string>
    public loginStatus: Observable<boolean>

    //#endregion

    constructor(private accountService: AccountService, private helperService: HelperService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.displayName = this.accountService.currentDisplayName
        this.editUserLink = this.accountService.currentUserId
        this.loginStatus = this.accountService.isLoggedIn
    }

    //#endregion

    //#region public methods

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onEditUser(): void {
        let userId = ''
        this.accountService.currentUserId.subscribe((result: any) => {
            userId = result
        })
        this.helperService.saveItem('editUserCaller', 'userGreeting')
        this.router.navigate([this.baseUrl, userId])
    }

    public onLogout(): void {
        this.accountService.logout()
    }

    //#endregion

}
