import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HelperService } from 'src/app/shared/services/helper.service'
import { Observable } from 'rxjs'
import { Announcement } from './announcement'
import { DataService } from 'src/app/shared/services/data.service'

@Injectable({ providedIn: 'root' })

export class AnnouncementService extends DataService {

    constructor(private httpClient: HttpClient, private helperService: HelperService) {
        super(httpClient, '/api/announcements')
    }

    //#region public methods

    public getCount(): Observable<Announcement> {
        const userId = this.helperService.readItem('userId')
        return this.httpClient.get<Announcement>('api/announcements/' + userId)
    }

    //#endregion

}
