import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListResolved } from './../../shared/classes/list-resolved';
import { PickupPointService } from './pickupPoint.service';

@Injectable({ providedIn: 'root' })

export class PickupPointListResolver implements Resolve<ListResolved> {

    constructor(private pickupPointService: PickupPointService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ListResolved> {
        return this.pickupPointService.getAllForRoute(route.params.routeId)
            .pipe(
                map((pickupPointList) => new ListResolved(pickupPointList)),
                catchError((err: any) => of(new ListResolved(null, err)))
            )
    }

}
