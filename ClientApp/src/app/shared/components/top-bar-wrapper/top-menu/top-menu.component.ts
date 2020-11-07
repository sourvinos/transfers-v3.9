import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { AccountService } from 'src/app/shared/services/account.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageMenuService } from 'src/app/shared/services/messages-menu.service'

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})

export class TopMenuComponent {

    //#region variables

    private feature = 'menu'
    public loginStatus: Observable<boolean>
    public theme = 'light'

    //#endregion

    constructor(private accountService: AccountService, private helperService: HelperService, private messageMenuService: MessageMenuService) { }
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
        return this.messageMenuService.getDescription(this.feature, id)
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
        this.loginStatus = this.accountService.isLoggedIn
    }

    //#endregion

}
