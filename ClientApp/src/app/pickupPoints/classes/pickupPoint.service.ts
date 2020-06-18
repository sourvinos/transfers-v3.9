import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'
import { PickupPoint } from './pickupPoint'

@Injectable({ providedIn: 'root' })

export class PickupPointService extends DataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, '/api/pickupPoints')
    }

    getAllForRoute(routeId: string): Observable<PickupPoint[]> {
        return this.http.get<PickupPoint[]>('/api/pickupPoints/routeId/' + routeId)
    }

    getAllActive(): Observable<PickupPoint[]> {
        return this.http.get<PickupPoint[]>('/api/pickupPoints/getActive')
    }

}
