import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageTableService {

    messages: any = []

    constructor(private httpClient: HttpClient) {
        this.getMessages()
    }

    public getMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/table/table.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.messages = response
                    resolve(this.messages)
                })
        })
        return promise
    }

    public getDescription(feature: string, id: string) {
        let description = ''
        this.messages.filter((f: { feature: string; labels: any[] }) => {
            if (f.feature === feature) {
                f.labels.filter(l => {
                    if (l.id == id) {
                        description = l.message
                    }
                })
            }
        })
        return description
    }

}

