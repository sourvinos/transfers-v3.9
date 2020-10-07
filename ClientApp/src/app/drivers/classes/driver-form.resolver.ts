import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Driver } from './driver'
import { DriverService } from './driver.service'

@Injectable({ providedIn: 'root' })

export class DriverFormResolver {

    constructor(private driverService: DriverService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Driver> {
        return this.driverService.getSingle(route.params.id)
    }

}
