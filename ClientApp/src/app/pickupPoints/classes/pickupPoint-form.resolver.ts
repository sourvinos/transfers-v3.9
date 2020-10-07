import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { PickupPointService } from './pickupPoint.service'

@Injectable({ providedIn: 'root' })

export class PickupPointFormResolver {

    constructor(private pickupPointService: PickupPointService) { }

    resolve(route: ActivatedRouteSnapshot):Observable<any> {
        return this.pickupPointService.getSingle(route.params.pickupPointId)
    }

}
