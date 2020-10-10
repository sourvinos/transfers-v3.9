import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { throwError } from 'rxjs'
import { RouteService } from './route.service'

@Injectable({ providedIn: 'root' })

export class RouteFormResolver {

    constructor(private routeService: RouteService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        const response = this.routeService.getSingle(route.params.id)
        response.subscribe(() => {
            return response
        }, () => {
            return throwError(404)
        })
    }

}
