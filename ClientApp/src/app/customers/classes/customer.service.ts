import { Customer } from './customer'
import { DataService } from 'src/app/shared/services/data.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class CustomerService extends DataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, '/api/customers')
    }

    getAllActive(): Observable<Customer[]> {
        return this.http.get<Customer[]>('/api/customers/getActive')
    }

}
