import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class LabelMessageService {

    labels: any = []

    constructor(private httpClient: HttpClient) {
        this.getLabelMessages()
    }

    public getLabelMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/labels/labels.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.labels = response
                    resolve(this.labels)
                })
        })
        return promise
    }

    public getLabelDescription(feature: string, id: string) {
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

