import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'
import { PickupPoint } from './pickupPoint'

@Injectable({ providedIn: 'root' })

export class PickupPointService extends DataService {

    constructor(http: HttpClient) {
        super(http, '/api/pickupPoints')
    }

    getAllActive(): Observable<PickupPoint[]> {
        return this.http.get<PickupPoint[]>('/api/pickupPoints/getActive')
    }

    getAllForRoute(routeId: string): Observable<PickupPoint[]> {
        return this.http.get<PickupPoint[]>('/api/pickupPoints/routeId/' + routeId)
    }

}
