import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DataService } from 'src/app/shared/services/data.service'
import { TransferOverviewDetailsViewModel } from './transfer-overview-details-view-model'
import { TransferOverviewViewModel } from './transfer-overview-view-model'
import { TransferPersonsPerDate } from './transfer-persons-per-date'
import { TransferViewModel } from './transfer-view-model'

@Injectable({ providedIn: 'root' })

export class TransferService extends DataService {

    constructor(http: HttpClient) {
        super(http, '/api/transfers')
    }

    assignDriver(driverId: string, ids: string[]): Observable<any> {
        let params = new HttpParams().set('driverId', driverId).set('id', ids[0])
        ids.forEach((element, index) => {
            if (index > 0) {
                params = params.append('id', element)
            }
        })
        return this.http.patch(this.url + '/assignDriver?', null, { params: params })
    }

    get(date: string): Observable<TransferViewModel> {
        return this.http.get<TransferViewModel>('/api/transfers/date/' + date)
    }

    getOverview(fromDate: string, toDate: string): Observable<TransferOverviewViewModel> {
        return this.http.get<TransferOverviewViewModel>('/api/transfers/getOverview/fromDate/' + fromDate + '/toDate/' + toDate)
    }

    getOverviewDetails(fromDate: string, toDate: string): Observable<TransferOverviewDetailsViewModel> {
        return this.http.get<TransferOverviewDetailsViewModel>('/api/transfers/getOverviewDetails/fromDate/' + fromDate + '/toDate/' + toDate)
    }

    getPersonsPerDate(fromDate: string, toDate: string): Observable<TransferPersonsPerDate> {
        return this.http.get<TransferPersonsPerDate>('/api/transfers/totalPersonsPerDate/fromDate/' + fromDate + '/toDate/' + toDate)
    }

    getPersonsPerMonth(fromDate: string, toDate: string): Observable<TransferPersonsPerDate> {
        return this.http.get<TransferPersonsPerDate>('/api/transfers/totalPersonsPerMonth/fromDate/' + fromDate + '/toDate/' + toDate)
    }

}
