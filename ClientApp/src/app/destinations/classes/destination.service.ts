import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'
import { Destination } from './destination'

@Injectable({ providedIn: 'root' })

export class DestinationService extends DataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, '/api/destinations')
    }

    //#region public methods

    public getAllActive(): Observable<Destination[]> {
        return this.http.get<Destination[]>('/api/destinations/getActive')
    }

    //#endregion

}
