import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class HelperService {

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
        return 'Island cruises'
    }

}
