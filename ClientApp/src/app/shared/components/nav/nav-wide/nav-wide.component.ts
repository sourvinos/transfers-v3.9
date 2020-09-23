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

    constructor(private accountService: AccountService, private messageMenuService: MessageMenuService) {
        this.isScreenWide = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.isScreenWide = this.getScreenWidth()
    }

    ngOnInit() {
        this.getLoginStatus()
        this.updateNavigation()
    }

    public onLogout() {
        this.accountService.logout()
    }

    public getLabel(id: string) {
        return this.messageMenuService.getDescription(this.feature, id)
    }

    private getLoginStatus() {
        this.loginStatus = this.accountService.isLoggedIn
    }
 
    private getScreenWidth() {
        return document.getElementById("wrapper").clientWidth > 1366
    }

    private updateNavigation() {
        this.messageMenuService.getMessages().then((res: any[]) => {
            res.forEach(element => {
                this.menuItems.push(element.message)
            })
        })
    }

}