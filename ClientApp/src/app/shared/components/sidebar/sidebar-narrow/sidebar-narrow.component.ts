import { HelperService } from 'src/app/shared/services/helper.service'
import { Component, HostListener } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-sidebar-narrow',
    templateUrl: './sidebar-narrow.component.html',
    styleUrls: ['../sidebar-wrapper/sidebar-wrapper.component.css', './sidebar-narrow.component.css']
})

export class SidebarNarrowComponent {

    isNotLoaded = true
    loginStatus: Observable<boolean>
    displayName: Observable<string>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    isScreenNarrow: boolean
    theme = ''

    constructor(private accountService: AccountService, private helperService: HelperService) {
        this.theme = this.helperService.getThemeFromLocalStorage
        this.isScreenNarrow = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.isScreenNarrow = this.getScreenWidth()
    }

    ngOnInit() {
        this.loginStatus = this.accountService.isLoggedIn
        this.displayName = this.accountService.currentDisplayName
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isNotLoaded = false
        }, 1000)
    }

    onLogout() {
        this.accountService.logout()
    }

    private getScreenWidth() {
        return document.getElementsByTagName("section")[0].clientWidth <= 1366
    }

}