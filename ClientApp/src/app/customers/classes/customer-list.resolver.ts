import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerService } from './customer.service';
import { ResolvedCustomerList } from './resolved-customer-list';

@Injectable({ providedIn: 'root' })

export class CustomerListResolver implements Resolve<ResolvedCustomerList> {

    constructor(private customerService: CustomerService) { }

    resolve(): Observable<ResolvedCustomerList> {
        return this.customerService.getAll()
            .pipe(
                map((customerList) => new ResolvedCustomerList(customerList)),
                catchError((err: any) => of(new ResolvedCustomerList(null, err)))
            )

    }

}
