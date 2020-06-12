import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class MessageService {

    public showAddedRecord(): string { return 'Record created.' }
    public showUpdatedRecord(): string { return 'Record updated.' }
    public showDeletedRecord(): string { return 'Record deleted.' }
    public showNotFoundRecord(): string { return 'Record does not exist.' }
    public askConfirmationToAbortEditing(): string { return 'If you continue, changes will be lost.' }
    public askConfirmationToDelete(): string { return 'If you continue, this record will be gone for ever.' }
    public recordIsInUse(): string { return 'This record is in use and can not be deleted.' }
    public noRecordsSelected(): string { return 'No records have been selected.' }
    public recordsHaveBeenProcessed(): string { return 'All records have been processed.' }
    public noDefaultDriverFound(): string { return 'No default driver found.' }
    public noContactWithApi(): string { return 'Unable to get any records from the server.' }
    public resetPassword(): string { return 'If your email exists in our database, you will be redirected to the password reset page.' }

}
