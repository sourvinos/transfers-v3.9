import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AccountService } from '../../services/account.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-sidebar-wide',
    templateUrl: './sidebar-wide.component.html',
    styleUrls: ['./sidebar-wide.component.css']
})

export class SidebarWideComponent implements OnInit, AfterViewInit {

    isNotLoaded = true
    loginStatus: Observable<boolean>
    displayName: Observable<string>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    customers = 'assets/customers.png'
    customersHover = 'assets/customers-hover.png'

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

    triggerEvent(elem: HTMLElement, event: string) {
        const clickEvent = new Event(event)
        elem.dispatchEvent(clickEvent)
    }

    onCloseSidebar() {
        const hamburger = document.getElementById('hamburger')
        if (hamburger.className === 'open') {
            this.triggerEvent(hamburger, 'click')
        }
    }

    onLogout() {
        this.accountService.logout()
    }

}
