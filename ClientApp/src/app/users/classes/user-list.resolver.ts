import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { UserService } from './user.service'

@Injectable({ providedIn: 'root' })

export class UserListResolver implements Resolve<ListResolved> {

    constructor(private userService: UserService) { }

    resolve(): Observable<ListResolved> {
        return this.userService.getAll()
            .pipe(
                map((userList) => new ListResolved(userList)),
                catchError((err) => of(new ListResolved(null, err)))
            )
    }

}
