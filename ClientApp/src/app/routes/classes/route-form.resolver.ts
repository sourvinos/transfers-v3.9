import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { Route } from './route'
import { RouteService } from './route.service'

@Injectable({ providedIn: 'root' })

export class RouteFormResolver implements Resolve<Route> {

    constructor(private routeService: RouteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Route> {
        return this.routeService.getSingle(route.params.id)
    }

}
