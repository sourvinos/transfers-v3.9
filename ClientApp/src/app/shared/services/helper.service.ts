import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class HelperService {

    disableFields(fields: string[]) {
        fields.forEach((element: string) => {
            document.getElementById(element).setAttribute('disabled', 'true')
        })
    }

    enableFields(fields: string[]) {
        fields.forEach((element: string) => {
            document.getElementById(element).removeAttribute('disabled')
        })
    }

    setFocus(element: string) {
        setTimeout(() => {
            document.getElementById(element).focus()
            document.execCommand('selectAll')
        }, 200)
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
