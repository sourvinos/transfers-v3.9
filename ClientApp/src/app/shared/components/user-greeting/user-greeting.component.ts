import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'user-greeting',
    templateUrl: './user-greeting.component.html',
    styleUrls: ['./user-greeting.component.css']
})

export class UserGreetingComponent implements OnInit {

    //#region variables

    displayName: Observable<string>
    loginStatus: Observable<boolean>

    //#endregion

    constructor(private accountService: AccountService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loginStatus = this.accountService.isLoggedIn
        this.displayName = this.accountService.currentDisplayName
    }

    //#endregion

}
