import { Component, HostListener } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AccountService } from 'src/app/shared/services/account.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { takeUntil } from 'rxjs/operators'
import { MenuItemService } from 'src/app/shared/services/menu-items.service'
import { fade } from 'src/app/shared/animations/animations'

@Component({
    selector: 'nav-wide',
    templateUrl: './nav-wide.component.html',
    styleUrls: ['../nav-wrapper/nav-wrapper.component.css', './nav-wide.component.css'],
    animations: [fade]
})

export class NavWideComponent {

    isNotLoaded = true
    loginStatus: Observable<boolean>
    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }
    menuItems: string[] = []
    language = ''
    ngUnsubscribe = new Subject<void>()
    isScreenWide: boolean
    feature = 'menu'

    constructor(private accountService: AccountService, private menuItemsService: MenuItemService, private interactionService: InteractionService) {
        this.isScreenWide = this.getScreenWidth()
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.isScreenWide = this.getScreenWidth()
    }

    ngOnInit() {
        this.loginStatus = this.accountService.isLoggedIn
        this.updateNavigation()
        this.subscribeToInteractionService()
    }

    onLogout() {
        this.accountService.logout()
    }

    public getLabel(id: string) {
        return this.menuItemsService.getMessageDescription(this.feature,id)
    }

    private getScreenWidth() {
        return document.getElementById("wrapper").clientWidth > 1366
    }

    private subscribeToInteractionService() {
        // this.interactionService.language.pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        //     this.language = result
        //     this.menuItems = []
        //     this.updateNavigation()
        // })
    }

    private updateNavigation() {
        this.menuItemsService.getMenuItems().then((res: any[]) => {
            res.forEach(element => {
                this.menuItems.push(element.message)
            })
        })
    }

}