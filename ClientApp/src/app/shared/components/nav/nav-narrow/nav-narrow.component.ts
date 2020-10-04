import { Component, HostListener } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { fade } from 'src/app/shared/animations/animations'
import { MessageMenuService } from 'src/app/shared/services/messages-menu.service'

@Component({
    selector: 'nav-narrow',
    templateUrl: './nav-narrow.component.html',
    styleUrls: ['../nav-wrapper/nav-wrapper.component.css', './nav-narrow.component.css'],
    animations: [fade]
})

export class NavNarrowComponent {

    //#region variables

    isNotLoaded = true
    loginStatus: Observable<boolean>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    imagePathName = '/assets/images/navigation/'
    theme = 'light'
    isScreenNarrow: boolean
    feature = 'menu'
    menuItems: string[] = []

    //#endregion

    constructor(private accountService: AccountService, private messageMenuService: MessageMenuService) {
        this.isScreenNarrow = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize(): any {
        this.isScreenNarrow = this.getScreenWidth()
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.theme = this.getTheme()
        this.loginStatus = this.accountService.isLoggedIn
        this.updateNavigation()
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isNotLoaded = false
        }, 1000)
    }

    ngDoCheck(): void {
        this.compareCurrentThemeWithLocalStorage()
    }

    //#endregion

    //#region public methods

    public onGetLabel(id: string): string {
        return this.messageMenuService.getDescription(this.feature, id)
    }

    public onLogout(): void {
        this.accountService.logout()
    }

    //#endregion

    //#region private methods

    private compareCurrentThemeWithLocalStorage(): void {
        if (localStorage.getItem('theme') != this.theme) {
            this.theme = localStorage.getItem('theme')
        }
    }

    private getScreenWidth(): boolean {
        return document.getElementById("wrapper").clientWidth <= 1366
    }

    private getTheme(): string {
        return localStorage.getItem('theme')
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