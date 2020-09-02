import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'user-greeting',
    templateUrl: './user-greeting.component.html',
    styleUrls: ['./user-greeting.component.css']
})

export class UserGreetingComponent implements OnInit {

    displayName: Observable<string>
    loginStatus: Observable<boolean>

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        this.loginStatus = this.accountService.isLoggedIn
        this.displayName = this.accountService.currentDisplayName
    }

}
