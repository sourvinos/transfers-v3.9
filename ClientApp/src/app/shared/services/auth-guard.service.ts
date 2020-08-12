import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AccountService } from './account.service'

@Injectable({ providedIn: 'root' })

export class AuthGuardService implements CanActivate {

    constructor(private accountService: AccountService, private router: Router) { }

    canActivate() {
        if (!this.accountService.getLoginStatus()) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }

}
