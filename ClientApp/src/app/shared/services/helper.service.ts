import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class HelperService {

    setFocus(element: string): void {
        setTimeout(() => {
            document.getElementById(element).focus()
            document.execCommand('selectAll')
        }, 200)
    }

    getUserIdFromLocalStorage(): string {
        return localStorage.getItem('userId')
    }

    getDateFromLocalStorage(): string {
        return localStorage.getItem('date')
    }

    getApplicationTitle(): string {
        return 'People movers'
    }

}
