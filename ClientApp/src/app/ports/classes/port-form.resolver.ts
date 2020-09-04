import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { Port } from './port'
import { PortService } from './port.service'

@Injectable({ providedIn: 'root' })

export class PortFormResolver implements Resolve<Port> {

    constructor(private portService: PortService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Port> {
        return this.portService.getSingle(route.params.id)
    }

}
