import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageService {

    messages: any = []
    feature = 'snackbarMessages'

    constructor(private httpClient: HttpClient) {
        this.getSnackbarMessages()
    }

    public getSnackbarMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/snackbar/snackbar.' + localStorage.getItem('language') + '.json').toPromise().then(
                response => {
                    this.messages = response
                    resolve(this.messages)
                })
        })
        return promise
    }

    public getMessageDescription(feature: string, id: string) {
        let returnValue = ''
        this.messages.filter((f: { feature: string; labels: any[] }) => {
            if (f.feature === feature) {
                f.labels.filter(l => {
                    if (l.id == id) {
                        returnValue = l.message
                    }
                })
            }
        })
        return returnValue
    }

    public recordCreated(): string { return this.getMessageDescription(this.feature, "recordCreated") }
    public recordUpdated(): string { return this.getMessageDescription(this.feature, "recordUpdated") }
    public recordDeleted(): string { return this.getMessageDescription(this.feature, "recordDeleted") }
    public askConfirmationToAbortEditing(): string { return this.getMessageDescription(this.feature, "askConfirmationToAbortEditing") }
    public askConfirmationToDelete(): string { return this.getMessageDescription(this.feature, "askConfirmationToDelete") }
    public noRecordsSelected(): string { return this.getMessageDescription(this.feature, "noRecordsSelected") }
    public selectedRecordsHaveBeenProcessed(): string { return this.getMessageDescription(this.feature, "selectedRecordsHaveBeenProcessed") }
    public noDefaultDriverFound(): string { return this.getMessageDescription(this.feature, "noDefaultDriverFound") }
    public noContactWithServer(): string { return this.getMessageDescription(this.feature, "noContactWithServer") }
    public emailSent(): string { return this.getMessageDescription(this.feature, "emailSent") }
    public wrongCurrentPassword(): string { return this.getMessageDescription(this.feature, "wrongCurrentPassword") }
    public accountNotConfirmed(): string { return this.getMessageDescription(this.feature, "accountNotConfirmed") }
    public authenticationFailed(): string { return this.getMessageDescription(this.feature, "authenticationFailed") }
    public unableToResetPassword(): string { return this.getMessageDescription(this.feature, "unableToResetPassword") }
    public passwordChanged(): string { return this.getMessageDescription(this.feature, "passwordChanged") }
    public formIsDirty(): string { return this.getMessageDescription(this.feature, "formIsDirty") }

    public getHttpErrorMessage(errorCode: number, feature = 'snackbarMessages') {
        let returnValue = ''
        this.messages.filter((f: { feature: string; labels: any[] }) => {
            if (f.feature === feature) {
                f.labels.filter(l => {
                    if (l.error == errorCode) {
                        returnValue = l.message
                    }
                })
            }
        })
        return returnValue
    }

}
