import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { TransferListResolved } from './transfer-list-resolved'
import { TransferService } from './transfer.service'

@Injectable({ providedIn: 'root' })

export class TransferListResolver implements Resolve<TransferListResolved> {

    dateIn: string

    constructor(private transferService: TransferService) { }

    // resolve(route: ActivatedRouteSnapshot): any {
    //     return this.transferService.getTransfers(route.params.dateIn)
    //       .pipe(
    //         map((transferList) => new ListResolved(transferList)),
    //         catchError((err: any) => of(new ListResolved(null, err)))
    //       )
    // }

    resolve(route: ActivatedRouteSnapshot): Observable<TransferListResolved> {
        return this.transferService.getTransfers(route.params.dateIn)
            .pipe(
                map((transferList) => new TransferListResolved(transferList)),
                catchError((err: any) => of(new TransferListResolved(null, err)))
            )
    }

}
