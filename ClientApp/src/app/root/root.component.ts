import { HelperService } from 'src/app/shared/services/helper.service'
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { AccountService } from '../shared/services/account.service'

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})

export class RootComponent implements OnInit, AfterViewInit {

    theme = ''
    showLoadingIndication = true

    constructor(private accountService: AccountService, private router: Router, private helperService: HelperService) {
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

    ngOnInit() {
        this.theme = this.helperService.getThemeFromLocalStorage
    }

    ngAfterViewInit() {
        this.positionLoader()
    }

    private positionLoader() {
        document.getElementById('spinner').style.left = (document.getElementsByTagName('app-main')[0].clientWidth / 2) - (document.getElementById('spinner').clientWidth) + document.getElementById('sidebar').clientWidth + 'px'
        document.getElementById('spinner').style.top = (document.getElementsByTagName('app-main')[0].clientHeight / 2) - (document.getElementById('spinner').clientHeight / 2) + 'px'
    }

}
