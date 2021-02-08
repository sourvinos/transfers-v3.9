import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class NotificationService {

    constructor(private httpClient: HttpClient) { }

    //#region public methods

    public getCount(): Observable<number> {
        return this.httpClient.get<number>('/api/notifications/getUnread/')
    }

    //#endregion

}
