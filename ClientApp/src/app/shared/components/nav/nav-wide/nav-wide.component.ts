import { MessageService } from './../../../services/message.service'
import { AfterViewInit, Component, OnInit, HostListener } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AccountService } from 'src/app/shared/services/account.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { takeUntil } from 'rxjs/operators'

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
    menuItems: string[] = []
    language = ''
    ngUnsubscribe = new Subject<void>()
    isScreenWide: boolean

    constructor(private accountService: AccountService, private messageService: MessageService, private interactionService: InteractionService) {
        this.isScreenWide = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.isScreenWide = this.getScreenWidth()
    }

    ngOnInit() {
        this.loginStatus = this.accountService.isLoggedIn
        this.displayName = this.accountService.currentDisplayName
        this.updateNavigation()
        this.subscribeToInteractionService()
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
        return document.getElementById("wrapper").clientWidth > 1366
    }

    private subscribeToInteractionService() {
        this.interactionService.language.pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
            this.language = result
            this.menuItems = []
            this.updateNavigation()
        })
    }

    private updateNavigation() {
        this.messageService.getMenu().then((res: any[]) => {
            res.forEach(element => {
                this.menuItems.push(element.message)
            })
        })
    }

}