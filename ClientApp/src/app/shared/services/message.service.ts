import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageService {

    messages: any = []

    constructor(private httpClient: HttpClient) { }

    public httpMessages = [
        { id: 400, description: 'This record is in use and can not be deleted.' },
        { id: 404, description: 'This record does not exist.' },
        { id: 409, description: 'There is already a default driver.' }
    ]

    public recordCreated(): string { return 'This record has been created.' }
    public recordUpdated(): string { return 'This record has been updated.' }
    public recordDeleted(): string { return 'This record has been deleted.' }
    public askConfirmationToAbortEditing(): string { return 'If you continue, changes will be lost.' }
    public askConfirmationToDelete(): string { return 'If you continue, this record will be lost for ever.' }
    public noRecordsSelected(): string { return 'No records have been selected.' }
    public recordsHaveBeenProcessed(): string { return 'All records have been processed.' }
    public noDefaultDriverFound(): string { return 'A default driver has not been found.' }
    public noContactWithApi(): string { return 'Unable to get any response from the server.' }
    public resetPassword(): string { return 'If your email exists in our database, you will be redirected to the password reset page.' }
    public wrongCurrentPassword(): string { return 'The current password is wrong.' }

    public getHttpErrorMessage(id: number) {
        const message = this.httpMessages.filter(x => x.id == id)
        return message ? message[0].description : 'Something went very wrong.'
    }

    getMenu() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/menu.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.messages = response
                    resolve(this.messages)
                })
        })
        return promise
    }

    getMessage(messageNo: string) {
        const filteredMessages = this.messages.filter((message: { id: string }) => message.id == messageNo)
        return filteredMessages[0].message
    }


}
