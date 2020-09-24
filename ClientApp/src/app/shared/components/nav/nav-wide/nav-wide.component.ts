import { Component, HostListener } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AccountService } from 'src/app/shared/services/account.service'
import { fade } from 'src/app/shared/animations/animations'
import { MessageMenuService } from 'src/app/shared/services/messages-menu.service'

@Component({
    selector: 'nav-wide',
    templateUrl: './nav-wide.component.html',
    styleUrls: ['../nav-wrapper/nav-wrapper.component.css', './nav-wide.component.css'],
    animations: [fade]
})

export class NavWideComponent {

    //#region variables

    isNotLoaded = true
    loginStatus: Observable<boolean>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    menuItems: string[] = []
    language = ''
    ngUnsubscribe = new Subject<void>()
    isScreenWide: boolean
    feature = 'menu'

    //#endregion

    constructor(private accountService: AccountService, private messageMenuService: MessageMenuService) {
        this.isScreenWide = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize(): any {
        this.isScreenWide = this.getScreenWidth()
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.getLoginStatus()
        this.updateNavigation()
    }

    //#endregion

    //#region public methods

    public onLogout(): void {
        this.accountService.logout()
    }

    public onGetLabel(id: string): string {
        return this.messageMenuService.getDescription(this.feature, id)
    }

    //#endregion

    //#region private methods

    private getLoginStatus(): void {
        this.loginStatus = this.accountService.isLoggedIn
    }

    private getScreenWidth(): boolean {
        return document.getElementById("wrapper").clientWidth > 1366
    }

    private updateNavigation(): void {
        this.messageMenuService.getMessages().then((res: any[]) => {
            res.forEach(element => {
                this.menuItems.push(element.message)
            })
        })
    }

    //#endregion

}