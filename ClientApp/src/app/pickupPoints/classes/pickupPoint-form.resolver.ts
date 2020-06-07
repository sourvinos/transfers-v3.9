import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PickupPoint } from './pickupPoint';
import { PickupPointService } from './pickupPoint.service';

@Injectable({ providedIn: 'root' })

export class PickupPointFormResolver implements Resolve<PickupPoint> {

    constructor(private pickupPointService: PickupPointService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.pickupPointService.getSingle(route.params.pickupPointId)
    }

}
