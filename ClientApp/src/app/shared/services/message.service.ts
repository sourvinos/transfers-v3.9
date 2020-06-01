import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class MessageService {

    public showAddedRecord() { return 'Record created.' }
    public showUpdatedRecord() { return 'Record updated.' }
    public showDeletedRecord() { return 'Record deleted.' }
    public showNotFoundRecord() { return 'Record does not exist.' }
    public askConfirmationToAbortEditing() { return 'If you continue, changes will be lost.' }
    public askConfirmationToDelete() { return 'If you continue, this record will be gone for ever.' }
    public recordIsInUse() { return 'This record is in use and can not be deleted.' }
    public noRecordsSelected() { return 'No records have been selected.' }
    public recordsHaveBeenProcessed() { return 'All records have been processed.' }
    public noDefaultDriverFound() { return 'No default driver found.' }
    public noContactWithApi() { return 'Unable to get any records from the server.' }
    public resetPassword() { return 'The hosting provider does not allow emails to be sent, so please click "OK" to go to the password reset page.' }

}
