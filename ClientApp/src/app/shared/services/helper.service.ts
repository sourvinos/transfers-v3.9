import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class HelperService {

    appName = {
        header: environment.appName.header,
        subHeader: environment.appName.subHeader
    }

    setFocus(element: string) {
        setTimeout(() => {
            const input = <HTMLInputElement>document.getElementById(element)
            input.focus()
            input.select()
        }, 200)
    }

    getUserIdFromLocalStorage() {
        return localStorage.getItem('userId')
    }

    getDateFromLocalStorage() {
        return localStorage.getItem('date')
    }

    getApplicationTitle() {
        return this.appName.header + ' ' + this.appName.subHeader
    }

    get getThemeFromLocalStorage() {
        return localStorage.getItem('theme') || 'light'
    }

    saveThemeToLocalStorage(theme: string) {
        localStorage.setItem('theme', theme)
    }

}
