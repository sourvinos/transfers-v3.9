import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'
import { TransferViewModel } from './transferViewModel'

@Injectable({ providedIn: 'root' })

export class TransferService extends DataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, '/api/transfers')
    }

    getTransfers(date: string): Observable<TransferViewModel> {
        return this.http.get<TransferViewModel>('/api/transfers/date/' + date)
    }

    assignDriver(driverId: string, ids: string[]) {
        let params = new HttpParams().set('driverId', driverId).set('id', ids[0])
        ids.forEach((element, index) => {
            if (index > 0) {
                params = params.append('id', element)
            }
        })
        return this.http.patch(this.url + '/assignDriver?', null, { params: params })
    }

}
