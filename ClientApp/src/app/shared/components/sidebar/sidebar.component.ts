import { AfterViewInit, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AccountService } from '../../services/account.service'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit {

    isNotLoaded = true
    loginStatus: Observable<boolean>
    displayName: Observable<string>

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.loginStatus = this.accountService.isLoggedIn
        this.displayName = this.accountService.currentDisplayName
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isNotLoaded = false
        }, 1000);
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
