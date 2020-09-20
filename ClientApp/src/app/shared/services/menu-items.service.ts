import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MenuItemService {

    labels: any = []

    constructor(private httpClient: HttpClient) {
        this.getMenuItems()
    }

    getMenuItems() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/menu.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.labels = response
                    console.log(this.labels)
                    resolve(this.labels)
                })
        })
        return promise
    }

    public getMessageDescription(feature: string, id: string) {
        let returnValue = ''
        this.labels.filter((f: { feature: string; labels: any[] }) => {
            if (f.feature === feature) {
                f.labels.filter(l => {
                    if (l.id == id) {
                        returnValue = l.description
                    }
                })
            }
        })
        return returnValue
    }

}
