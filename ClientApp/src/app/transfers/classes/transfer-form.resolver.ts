import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { throwError } from 'rxjs'
import { Transfer } from './transfer'
import { TransferService } from './transfer.service'

@Injectable({ providedIn: 'root' })

export class TransferFormResolver implements Resolve<Transfer> {

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
