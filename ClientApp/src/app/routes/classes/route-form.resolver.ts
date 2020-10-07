import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Route } from './route'
import { RouteService } from './route.service'

@Injectable({ providedIn: 'root' })

export class RouteFormResolver {

    constructor(private routeService: RouteService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Route> {
        return this.routeService.getSingle(route.params.id)
    }

}
