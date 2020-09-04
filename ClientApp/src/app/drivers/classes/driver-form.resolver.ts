import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { Driver } from './driver'
import { DriverService } from './driver.service'

@Injectable({ providedIn: 'root' })

export class DriverFormResolver implements Resolve<Driver> {

    constructor(private driverService: DriverService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Driver> {
        return this.driverService.getSingle(route.params.id)
    }

}
