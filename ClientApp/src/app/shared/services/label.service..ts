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

    getLabel(id: any) {
        const country = this.labels.find((label: { id: any }) => label.id === id)
        return country.label || 'Unknown'
    }

}
