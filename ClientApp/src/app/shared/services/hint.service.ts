import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class HintService {

    hints: any = []

    constructor(private httpClient: HttpClient) {
        this.getHintMessages()
    }

    public getHintMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/hints/hints.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.hints = response
                    resolve(this.hints)
                })
        })
        return promise
    }

    public getHintDescription(id: string, stringLength = 0) {
        let hint = ''
        this.hints.labels.filter((l: { id: string; description: string }) => {
            if (l.id == id) {
                hint = l.description.replace('xx', stringLength.toString())
            }
        })
        return hint
    }

}

