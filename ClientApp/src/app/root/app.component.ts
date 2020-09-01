import { AfterViewInit, Component, HostListener } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { AccountService } from '../shared/services/account.service'

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

    showLoadingIndication = true

    constructor(private accountService: AccountService, private router: Router) {
        this.router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationStart) {
                this.showLoadingIndication = true
            }
            if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
                this.showLoadingIndication = false
            }
        })
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.positionLoader()
    }

    @HostListener('window:beforeunload', ['$event']) beforeUnloadHander() {
        this.accountService.logout()
    }

    ngAfterViewInit() {
        this.positionLoader()
    }

    private positionLoader() {
        document.getElementById('spinner').style.left = (document.getElementById('main').clientWidth / 2) - (document.getElementById('spinner').clientWidth) + document.getElementsByTagName('nav')[0].clientWidth + 'px'
        document.getElementById('spinner').style.top = (document.getElementById('main').clientHeight / 2) - (document.getElementById('spinner').clientHeight / 2) + 'px'
    }

}
