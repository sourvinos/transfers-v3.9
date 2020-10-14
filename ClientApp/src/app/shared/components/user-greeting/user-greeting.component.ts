import { Component } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'user-greeting',
    templateUrl: './user-greeting.component.html',
    styleUrls: ['./user-greeting.component.css']
})

export class UserGreetingComponent {

    //#region variables

    private baseUrl = '/users'
    public displayName: Observable<string>
    public editUserLink: Observable<string>
    public loginStatus: Observable<boolean>

    //#endregion

    constructor(private accountService: AccountService, private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry
            .addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/navigation/logout.svg'))
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.displayName = this.accountService.currentDisplayName
        this.editUserLink = this.accountService.currentUserId
        this.loginStatus = this.accountService.isLoggedIn
    }

    //#endregion

    //#region public methods

    public onGotoEditUser(): void {
        let a = ''
        this.accountService.currentUserId.subscribe((result: any) => {
            console.log('ID', result)
            a = result
        })
        localStorage.setItem('editUserCaller', 'userGreeting')
        this.router.navigate([this.baseUrl, a])
    }

    public onLogout(): void {
        this.accountService.logout()
    }

    //#endregion

}
