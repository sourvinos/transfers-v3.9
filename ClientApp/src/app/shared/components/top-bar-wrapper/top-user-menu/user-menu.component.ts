import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/shared/services/account.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent {

    //#region variables

    private baseUrl = '/users'
    private feature = 'userMenu'
    public displayName: Observable<string>
    public loginStatus: Observable<boolean>
    public theme = 'red'

    //#endregion

    constructor(private accountService: AccountService, private helperService: HelperService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.updateVariables()
        this.updateTheme()
    }

    ngDoCheck(): void {
        this.compareCurrentThemeWithStored()
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

    //#region private methods

    private compareCurrentThemeWithStored(): void {
        if (this.helperService.readItem('theme') != this.theme) {
            this.theme = this.helperService.readItem('theme')
        }
    }

    private getTheme(): string {
        return this.helperService.readItem('theme')
    }

    private updateTheme(): void {
        this.theme = this.getTheme()
    }

    private updateVariables(): void {
        this.displayName = this.accountService.currentDisplayName
        this.loginStatus = this.accountService.isLoggedIn
    }

    //#endregion

}
