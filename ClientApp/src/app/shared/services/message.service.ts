import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageService {

    messages: any = []

    constructor(private httpClient: HttpClient) {
        this.getMessages(localStorage.getItem('language') || 'en')
    }

    public httpMessages = [
        { id: 400, description: 'This record is in use and can not be deleted.' },
        { id: 404, description: 'This record does not exist.' },
        { id: 409, description: 'There is already a default driver.' }
    ]

    public recordCreated(): string { return this.messages[0].message }
    public recordUpdated(): string { return this.messages[1].message }
    public recordDeleted(): string { return this.messages[2].message }
    public askConfirmationToAbortEditing(): string { return this.messages[3].message }
    public askConfirmationToDelete(): string { return this.messages[4].message }
    public noRecordsSelected(): string { return this.messages[5].message }
    public recordsHaveBeenProcessed(): string { return this.messages[6].message }
    public noDefaultDriverFound(): string { return this.messages[7].message }
    public noContactWithServer(): string { return this.messages[8].message }
    public resetPassword(): string { return this.messages[9].message }
    public wrongCurrentPassword(): string { return this.messages[10].message }

    public getHttpErrorMessage(id: number) {
        const message = this.httpMessages.filter(x => x.id == id)
        return message ? message[0].description : this.messages[11].message
    }

    getMessages(language: string) {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/messages.' + language + '.json').toPromise().then(
                response => {
                    this.messages = response
                    resolve(this.messages)
                })
        })
        return promise
    }

}
