import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Announcement } from './announcement'

@Injectable({ providedIn: 'root' })

export class AnnouncementService {

    constructor(private httpClient: HttpClient) { }

    //#region public methods

    public getTotalPersonsPerDestinationForTomorrow(date: string): Observable<Announcement[]> {
        return this.httpClient.get<Announcement[]>('api/transfers/totalPersonsPerDestinationForTomorrow/' + date)
    }

    //#endregion

}
