import { Component, HostListener } from '@angular/core'
import { AccountService } from 'src/app/shared/services/account.service'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'nav-narrow',
    templateUrl: './nav-narrow.component.html',
    styleUrls: ['../nav-wrapper/nav-wrapper.component.css', './nav-narrow.component.css']
})

export class NavNarrowComponent {

    isNotLoaded = true
    loginStatus: Observable<boolean>
    displayName: Observable<string>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    imagePathName = '/assets/images/navigation/'
    isScreenNarrow: boolean

    constructor(private accountService: AccountService) {
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
        return document.getElementById("wrapper").clientWidth <= 1366
    }

}