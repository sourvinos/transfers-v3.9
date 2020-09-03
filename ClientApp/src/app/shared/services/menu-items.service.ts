import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MenuItemsService {

    menu: any = []

    constructor(private httpClient: HttpClient) { }

    getMenuItems() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/menu.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.menu = response
                    resolve(this.menu)
                })
        })
        return promise
    }

}
