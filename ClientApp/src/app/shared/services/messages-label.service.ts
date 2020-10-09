import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageLabelService {

    //#region variables

    private messages: any = []

    //#endregion

    constructor(private httpClient: HttpClient) {
        this.getMessages()
    }

    //#region public methods

    public getDescription(feature: string, id: string): string {
        let returnValue = ''
        this.messages.filter((f: { feature: string; labels: any[] }) => {
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

    public getMessages(): Promise<any> {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/label/label.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.messages = response
                    resolve(this.messages)
                })
        })
        return promise
    }

    //#endregion

}

