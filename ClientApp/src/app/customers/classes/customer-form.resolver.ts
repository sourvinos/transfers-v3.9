import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { Customer } from './customer'
import { CustomerService } from './customer.service'

@Injectable({ providedIn: 'root' })

export class CustomerFormResolver implements Resolve<Customer> {

    constructor(private customerService: CustomerService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Customer> {
        return this.customerService.getSingle(route.params.id)
    }

}
