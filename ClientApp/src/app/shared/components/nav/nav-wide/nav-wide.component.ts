import { Component, HostListener } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { fade } from 'src/app/shared/animations/animations'
import { MessageMenuService } from 'src/app/shared/services/messages-menu.service'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'nav-wide',
    templateUrl: './nav-wide.component.html',
    styleUrls: ['../nav-wrapper/nav-wrapper.component.css', './nav-wide.component.css'],
    animations: [fade]
})

export class NavWideComponent {

    //#region variables

    private feature = 'menu'
    private menuItems: string[] = []
    public appName: string
    public imagePathName = '/assets/images/navigation/'
    public isScreenWide: boolean
    public theme = 'light'

    //#endregion

    constructor(private accountService: AccountService, private helperService: HelperService, private messageMenuService: MessageMenuService) {
        this.isScreenWide = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize(): any {
        this.isScreenWide = this.getScreenWidth()
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.getAppName()
        this.updateTheme()
        this.updateNavigation()
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
        if (this.helperService.readItem('theme') != this.theme) {
            this.theme = this.helperService.readItem('theme')
        }
    }

    private getScreenWidth(): boolean {
        return document.getElementById("wrapper").clientWidth > 1366
    }

    private getAppName(): void {
        this.appName = this.helperService.getApplicationTitle()
    }

    private getTheme(): string {
        return this.helperService.readItem('theme')
    }

    private updateNavigation(): void {
        this.messageMenuService.getMessages().then((res: any[]) => {
            res.forEach(element => {
                this.menuItems.push(element.message)
            })
        })
    }

    private updateTheme(): void {
        this.theme = this.getTheme()
    }

    //#endregion

}