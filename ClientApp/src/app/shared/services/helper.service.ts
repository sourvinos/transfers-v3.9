import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class HelperService {

    //#region variables

    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }

    //#endregion

    //#region public methods

    public getApplicationTitle(): string {
        return this.appName.header + ' ' + this.appName.subHeader
    }

    public getDateFromLocalStorage(): string {
        return localStorage.getItem('date')
    }

    public getUserIdFromLocalStorage(): string {
        return localStorage.getItem('userId')
    }

    public setFocus(element: string): void {
        setTimeout(() => {
            const input = <HTMLInputElement>document.getElementById(element)
            input.focus()
            input.select()
        }, 200)
    }

    //#endregion

}
