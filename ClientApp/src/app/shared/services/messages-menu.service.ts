import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageMenuService {

    messages: any = []

    constructor(private httpClient: HttpClient) {
        this.getMessages()
    }

    public getMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/menu/menu.' + localStorage.getItem('language') + '.json').toPromise().then(
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
                        description = l.description
                    }
                })
            }
        })
        return description
    }

}

