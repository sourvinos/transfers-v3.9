import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class HelperService {

    setFocus(element: string) {
        const input = <HTMLInputElement>document.getElementById(element)
        input.focus()
        input.select()
    }

    getUserIdFromLocalStorage() {
        return localStorage.getItem('userId')
    }

    getDateFromLocalStorage() {
        return localStorage.getItem('date')
    }

    getApplicationTitle() {
        return 'People movers'
    }

}
