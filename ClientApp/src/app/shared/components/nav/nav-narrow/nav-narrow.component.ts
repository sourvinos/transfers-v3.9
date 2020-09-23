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

    isNotLoaded = true
    loginStatus: Observable<boolean>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    imagePathName = '/assets/images/navigation/'
    theme = ''
    isScreenNarrow: boolean
    feature = 'menu'

    constructor(private accountService: AccountService, private messageMenuService: MessageMenuService) {
        this.isScreenNarrow = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.isScreenNarrow = this.getScreenWidth()
    }

    ngOnInit() {
        this.theme = this.getTheme()
        this.loginStatus = this.accountService.isLoggedIn
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isNotLoaded = false
        }, 1000)
    }

    ngDoCheck() {
        this.compareCurrentThemeWithLocalStorage()
    }

    onLogout() {
        this.accountService.logout()
    }

    public getLabel(id: string) {
        return this.messageMenuService.getDescription(this.feature, id)
    }

    private compareCurrentThemeWithLocalStorage() {
        if (localStorage.getItem('theme') != this.theme) {
            this.theme = localStorage.getItem('theme')
        }
    }

    private getScreenWidth() {
        return document.getElementById("wrapper").clientWidth <= 1366
    }

    private getTheme() {
        return localStorage.getItem('theme')
    }

}