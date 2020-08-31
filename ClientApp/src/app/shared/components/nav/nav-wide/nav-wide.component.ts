import { AfterViewInit, Component, OnInit, HostListener } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AccountService } from 'src/app/shared/services/account.service'

@Component({
    selector: 'nav-wide',
    templateUrl: './nav-wide.component.html',
    styleUrls: ['../nav-wrapper/nav-wrapper.component.css', './nav-wide.component.css']
})

export class NavWideComponent implements OnInit, AfterViewInit {

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
        return document.getElementsByTagName("body")[0].clientWidth > 1366
    }

}