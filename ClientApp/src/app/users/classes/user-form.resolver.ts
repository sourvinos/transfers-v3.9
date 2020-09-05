import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { User } from 'src/app/account/classes/user'
import { UserService } from './user.service'

@Injectable({ providedIn: 'root' })

export class UserFormResolver implements Resolve<User> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getSingle(route.params.id)
    }

}