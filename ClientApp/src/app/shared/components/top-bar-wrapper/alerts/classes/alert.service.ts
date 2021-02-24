import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HelperService } from 'src/app/shared/services/helper.service'
import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'

@Injectable({ providedIn: 'root' })

export class AlertService extends DataService {

    constructor(private httpClient: HttpClient, private helperService: HelperService) {
        super(httpClient, '/api/alerts')
    }

    //#region public methods

    public getForUser(): Observable<Notification> {
        return this.httpClient.get<Notification>('api/alerts/getForUser/' + this.helperService.readItem('userId'))
    }

    //#endregion

}
