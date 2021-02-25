import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TransferPersonsPerDate } from 'src/app/transfers/classes/transfer-persons-per-date'

@Injectable({ providedIn: 'root' })

export class AnnouncementService {

    constructor(private httpClient: HttpClient) { }

    //#region public methods

    public getTotalPersonsPerDatePerDestination(fromDate: string, toDate: string): Observable<TransferPersonsPerDate[]> {
        return this.httpClient.get<TransferPersonsPerDate[]>('api/transfers/totalPersonsPerDate/fromDate/' + fromDate + '/toDate/' + toDate)
    }

    //#endregion

}
