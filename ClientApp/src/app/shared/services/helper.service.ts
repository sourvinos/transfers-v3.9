import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class HelperService {

    //#region variables

    private appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }

    //#endregion

    //#region public methods

    public getApplicationTitle(): string {
        return this.appName.header + ' ' + this.appName.subHeader
    }

    public setFocus(element: string): void {
        setTimeout(() => {
            const input = <HTMLInputElement>document.getElementById(element)
            input.focus()
            input.select()
        }, 200)
    }

    public saveItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }

    public readItem(item: string): string {
        return localStorage.getItem(item) || ''
    }

    //#endregion

}
