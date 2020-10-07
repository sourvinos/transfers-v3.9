import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { throwError } from 'rxjs'
import { TransferService } from './transfer.service'

@Injectable({ providedIn: 'root' })

export class TransferFormResolver {

    constructor(private transferService: TransferService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        const response = this.transferService.getSingle(route.params.id)
        response.subscribe(() => {
            return response
        }, () => {
            return throwError(404)
        })
    }

}
