import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class LabelService {

    labels: any = []

    constructor(private httpClient: HttpClient) {
        this.getLabels()
    }

    getLabels() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/labels.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.labels = response
                    resolve(this.labels)
                })
        })
        return promise
    }

    getLabelDescription(feature: string, id: string) {
        const f = this.labels.find((element: { feature: string }) => element.feature == feature)
        const p = f.labels.find((element: { id: string }) => { element.id == id })
        return p.description
    }

}

