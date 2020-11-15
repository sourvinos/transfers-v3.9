import { Component } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { MessageMenuService } from 'src/app/shared/services/messages-menu.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})

export class TopMenuComponent {

    //#region variables

    private feature = 'menu'
    public loginStatus: Observable<boolean>
    public userRole: Observable<string>

    //#endregion

    constructor(private accountService: AccountService, private messageMenuService: MessageMenuService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.updateVariables()
    }

    //#endregion

    //#region public methods

    public onGetLabel(id: string): string {
        return this.messageMenuService.getDescription(this.feature, id)
    }

    //#endregion

    //#region private methods

    private updateVariables(): void {
        this.loginStatus = this.accountService.isLoggedIn
        this.userRole = this.accountService.currentUserRole
    }

    //#endregion

    //#region getters

    get isConnectedUserAdmin(): boolean {
        let isAdmin = false
        this.userRole.subscribe(result => {
            isAdmin = result == 'Admin' ? true : false
        })
        return isAdmin
    }

    //#endregion

}