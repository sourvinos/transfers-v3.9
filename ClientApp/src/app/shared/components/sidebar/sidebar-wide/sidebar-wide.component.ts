import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AccountService } from 'src/app/shared/services/account.service'

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

    constructor(private accountService: AccountService) { }

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

}