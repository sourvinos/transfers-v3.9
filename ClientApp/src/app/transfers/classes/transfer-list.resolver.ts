import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListResolved } from 'src/app/shared/classes/list-resolved';
import { TransferService } from './transfer.service';
import { TransferViewModel } from './transferViewModel';

@Injectable({ providedIn: 'root' })

export class TransferListResolver implements Resolve<TransferViewModel> {

    dateIn: string

    constructor(private transferService: TransferService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.transferService.getTransfers(route.params.dateIn)
            .pipe(
                map((transferList) => new ListResolved(transferList)),
                catchError((err: any) => of(new ListResolved(null, err)))
            )
    }

    // resolve(route: ActivatedRouteSnapshot) {
    //     return this.transferService.getTransfers(route.params.dateIn)
    //         .pipe(
    //             map((transfer) => new TransferListResolved(transfer)),
    //             catchError((err: any) => of(new TransferListResolved(null, err)))
    //         )
    // }

}
