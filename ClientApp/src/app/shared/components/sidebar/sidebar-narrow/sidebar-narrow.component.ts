import { Component } from '@angular/core'
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
    displayName: Promise<string>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.loginStatus = this.accountService.isLoggedIn
        this.displayName = this.accountService.getUsername()
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
