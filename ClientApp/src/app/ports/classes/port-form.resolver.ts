import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Port } from './port'
import { PortService } from './port.service'

@Injectable({ providedIn: 'root' })

export class PortFormResolver {

    constructor(private portService: PortService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Port> {
        return this.portService.getSingle(route.params.id)
    }

}
