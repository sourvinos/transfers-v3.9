import { AfterViewInit, Component, OnInit, HostListener } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AccountService } from 'src/app/shared/services/account.service'
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'app-sidebar-wide',
    templateUrl: './sidebar-wide.component.html',
    styleUrls: ['../sidebar-wrapper/sidebar-wrapper.component.css', './sidebar-wide.component.css']
})

export class SidebarWideComponent implements OnInit, AfterViewInit {

    isNotLoaded = true
    loginStatus: Observable<boolean>
    displayName: Observable<string>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    isScreenWide: boolean

    constructor(private accountService: AccountService) {
        this.isScreenWide = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.isScreenWide = this.getScreenWidth()
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
        return document.getElementsByTagName("section")[0].clientWidth > 1366
    }

}