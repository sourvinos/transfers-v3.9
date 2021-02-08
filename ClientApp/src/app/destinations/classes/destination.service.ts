import { DataService } from 'src/app/shared/services/data.service'
import { Destination } from './destination'
import { HelperService } from './../../shared/services/helper.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class DestinationService extends DataService {

    constructor(httpClient: HttpClient, private helperService: HelperService) {
        super(httpClient, '/api/destinations')
    }

    //#region public methods

    public getCount(): Observable<number> {
        return this.http.get<number>('/api/destinations/getCount/')
    }

    public getAllActive(): Observable<Destination[]> {
        return this.http.get<Destination[]>('/api/destinations/getActive')
    }

    //#endregion

}
