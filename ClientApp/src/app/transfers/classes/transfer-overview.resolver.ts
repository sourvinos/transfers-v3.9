import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { TransferOverviewResolved } from './transfer-overview-resolved'
import { TransferService } from './transfer.service'

@Injectable({ providedIn: 'root' })

export class TransferOverviewResolver {

    constructor(private transferService: TransferService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<TransferOverviewResolved> {
        return this.transferService.getTransfersOverview(route.params.fromDate, route.params.toDate)
            .pipe(
                map((transferOverview) => new TransferOverviewResolved(transferOverview)),
                catchError((err: any) => of(new TransferOverviewResolved(null, err)))
            )
    }

}
