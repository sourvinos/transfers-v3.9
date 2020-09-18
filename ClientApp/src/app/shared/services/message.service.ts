import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Message } from '../classes/message'

@Injectable({ providedIn: 'root' })

export class MessageService {

    private messages: Message[] = []

    constructor(private httpClient: HttpClient) {
        this.getMessagesFromJson(localStorage.getItem('language') || 'en')
    }

    public recordCreated(): string { return this.getMessage("recordCreated") }
    public recordUpdated(): string { return this.getMessage("recordUpdated") }
    public recordDeleted(): string { return this.getMessage("recordDeleted") }
    public askConfirmationToAbortEditing(): string { return this.getMessage("askConfirmationToAbortEditing") }
    public askConfirmationToDelete(): string { return this.getMessage("askConfirmationToDelete") }
    public noRecordsSelected(): string { return this.getMessage("noRecordsSelected") }
    public selectedRecordsHaveBeenProcessed(): string { return this.getMessage("selectedRecordsHaveBeenProcessed") }
    public noDefaultDriverFound(): string { return this.getMessage("noDefaultDriverFound") }
    public noContactWithServer(): string { return this.getMessage("noContactWithServer") }
    public emailSent(): string { return this.getMessage("emailSent") }
    public wrongCurrentPassword(): string { return this.getMessage("wrongCurrentPassword") }
    public recordIsInUse(): string { return this.getMessage("recordIsInUse") }
    public recordNotFound(): string { return this.getMessage("recordNotFound") }
    public defaultDriverExists(): string { return this.getMessage("defaultDriverExists") }
    public unableToRegisterUser(): string { return this.getMessage("unableToRegisterUser") }
    public accountNotConfirmed(): string { return this.getMessage("accountNotConfirmed") }
    public authenticationFailed(): string { return this.getMessage("authenticationFailed") }
    public unableToResetPassword(): string { return this.getMessage("unableToResetPassword") }
    public passwordChanged(): string { return this.getMessage("passwordChanged") }
    public formIsDirty(): string { return this.getMessage("formIsDirty") }
    public unableToSaveRecord(): string { return this.getMessage("unableToSaveRecord") }

    public getHttpErrorMessage(id: number) {
        const message = this.messages.filter(x => x.id == id)
        return message ? message[0].message : this.getMessage("veryBad")
    }

    public getMessagesFromJson(language: string) {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/messages.' + language + '.json').toPromise().then(
                response => {
                    this.updateMessageArray(response)
                    resolve(this.messages)
                })
        })
        return promise
    }

    private updateMessageArray(response: any) {
        response.forEach((element: Message) => {
            this.messages.push(element)
        })
    }

    private getMessage(description: string): string {
        const found = this.messages.find(element => element.description == description)
        return found ? found.message : 'This message was not found in the collection.'
    }

}
