import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { TransferListResolved } from './transfer-list-resolved'
import { TransferService } from './transfer.service'

@Injectable({ providedIn: 'root' })

export class TransferListResolver  {

    constructor(private transferService: TransferService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<TransferListResolved> {
        return this.transferService.get(route.params.dateIn)
            .pipe(
                map((transferList) => new TransferListResolved(transferList)),
                catchError((err: any) => of(new TransferListResolved(null, err)))
            )
    }

}
