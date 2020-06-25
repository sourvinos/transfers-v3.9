import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class MessageService {

    public httpMessages = [
        { id: 400, description: 'This record is in use and can not be deleted.' },
        { id: 404, description: 'This record does not exist.' },
    ]

    public recordCreated(): string { return 'This record has been created.' }
    public recordUpdated(): string { return 'This record has been updated.' }
    public recordDeleted(): string { return 'This record has been deleted.' }
    public askConfirmationToAbortEditing(): string { return 'If you continue, changes will be lost.' }
    public askConfirmationToDelete(): string { return 'If you continue, this record will be lost for ever.' }
    public noRecordsSelected(): string { return 'No records have been selected.' }
    public recordsHaveBeenProcessed(): string { return 'All records have been processed.' }
    public noDefaultDriverFound(): string { return 'A default driver has not been found.' }
    public noContactWithApi(): string { return 'Unable to get any records from the server.' }
    public resetPassword(): string { return 'If your email exists in our database, you will be redirected to the password reset page.' }

    public getHttpErrorMessage(id: number) {
        const message = this.httpMessages.filter(x => x.id == id)
        return message ? message[0].description : 'Something went very wrong.'
    }

}
