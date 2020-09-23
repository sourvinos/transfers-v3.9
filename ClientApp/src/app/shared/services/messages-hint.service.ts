import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageHintService {

    messages: any = []

    constructor(private httpClient: HttpClient) {
        this.getMessages()
    }

    public getMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/hint/hint.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.messages = response
                    resolve(this.messages)
                })
        })
        return promise
    }

    public getDescription(id: string, stringLength = 0) {
        let description = ''
        this.messages.labels.filter((l: { id: string; description: string }) => {
            if (l.id == id) {
                description = l.description.replace('xx', stringLength.toString())
            }
        })
        return description
    }

}

