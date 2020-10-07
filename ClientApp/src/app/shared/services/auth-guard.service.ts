import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { AccountService } from './account.service'

@Injectable({ providedIn: 'root' })

export class AuthGuardService {

    constructor(private accountService: AccountService, private router: Router) { }

    //#region lifecycle hooks

    canActivate(): Observable<boolean> {
        return this.accountService.isLoggedIn.pipe(take(1), map((loginStatus: boolean) => {
            if (!loginStatus) {
                this.router.navigate(['/login'])
                return false
            }
            return true
        }))
    }

    //#endregion

}