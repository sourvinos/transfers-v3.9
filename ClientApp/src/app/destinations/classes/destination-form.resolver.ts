import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { Destination } from './destination'
import { DestinationService } from './destination.service'

@Injectable({ providedIn: 'root' })

export class DestinationFormResolver implements Resolve<Destination> {

    constructor(private destinationService: DestinationService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Destination> {
        return this.destinationService.getSingle(route.params.id)
    }

}
