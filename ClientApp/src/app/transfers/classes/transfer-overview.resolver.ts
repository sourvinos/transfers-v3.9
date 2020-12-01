import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { TransferOverviewResolved } from './transfer-overview-resolved'
import { TransferService } from './transfer.service'

@Injectable({ providedIn: 'root' })

export class TransferOverviewResolver {

    constructor(private transferService: TransferService) { }

    resolve(fromDate = '2020-01-01', toDate = '2020-12-31'): Observable<TransferOverviewResolved> {
        console.log('Resolver...')
        const result = this.transferService.getTransfersOverview(fromDate, toDate)
            .pipe(
                map((transferOverview) => new TransferOverviewResolved(transferOverview)),
                catchError((err: any) => of(new TransferOverviewResolved(null, err)))
            )
        console.log('Result', result)
        return result
    }

}
