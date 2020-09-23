import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })

export class MessageSnackbarService {

    messages: any = []
    feature = 'snackbarMessages'

    constructor(private httpClient: HttpClient) {
        this.getMessages()
    }

    public getMessages() {
        const promise = new Promise((resolve) => {
            this.httpClient.get('assets/languages/snackbar/snackbar.' + localStorage.getItem('language') + '.json').toPromise().then(
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

    public recordCreated(): string { return this.getDescription(this.feature, "recordCreated") }
    public recordUpdated(): string { return this.getDescription(this.feature, "recordUpdated") }
    public recordDeleted(): string { return this.getDescription(this.feature, "recordDeleted") }
    public askConfirmationToAbortEditing(): string { return this.getDescription(this.feature, "askConfirmationToAbortEditing") }
    public askConfirmationToDelete(): string { return this.getDescription(this.feature, "askConfirmationToDelete") }
    public noRecordsSelected(): string { return this.getDescription(this.feature, "noRecordsSelected") }
    public selectedRecordsHaveBeenProcessed(): string { return this.getDescription(this.feature, "selectedRecordsHaveBeenProcessed") }
    public noDefaultDriverFound(): string { return this.getDescription(this.feature, "noDefaultDriverFound") }
    public noContactWithServer(): string { return this.getDescription(this.feature, "noContactWithServer") }
    public emailSent(): string { return this.getDescription(this.feature, "emailSent") }
    public wrongCurrentPassword(): string { return this.getDescription(this.feature, "wrongCurrentPassword") }
    public accountNotConfirmed(): string { return this.getDescription(this.feature, "accountNotConfirmed") }
    public authenticationFailed(): string { return this.getDescription(this.feature, "authenticationFailed") }
    public unableToResetPassword(): string { return this.getDescription(this.feature, "unableToResetPassword") }
    public passwordChanged(): string { return this.getDescription(this.feature, "passwordChanged") }
    public formIsDirty(): string { return this.getDescription(this.feature, "formIsDirty") }

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
