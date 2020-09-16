import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class InteractionService {

    _record = new Subject<string[]>()
    _checked = new Subject<number>()
    _refreshList = new Subject<any>()
    _language = new Subject<string>()
    _tableRow = new Subject()

    record = this._record.asObservable()
    checked = this._checked.asObservable()
    refreshList = this._refreshList.asObservable()
    language = this._language.asObservable()
    tableRow = this._tableRow.asObservable()

    /**
     * Caller(s):
     *  transfer-form.ts
     *
     * Subscribers(s):
     *  transfer-list.ts
     *
     * Description:
     *  The form tells the list to refresh when a record is saved
     */
    mustRefreshList() {
        this._refreshList.next()
    }

    /** 
     * Caller(s):
     *  Custom-table.component.ts
     *
     * Subscriber(s):
     *  customer-list.ts
     *  destination-list.ts
     *  driver-list.ts
     *  pickupPoint-list.ts
     *  port-list.ts
     *  route-list.ts
     *  user-list.ts
     *
     * Description:
     *  The caller(s) send the selected item and the subscribers call the edit method
     *
    */
    sendObject(record: any) {
        this._record.next(record)
    }

    /**
     * Caller(s):
     *  transfer-list.ts
     *  custom-table.ts
     *
     * Subscriber(s):
     *  transfer-list.ts
     *
     * Description:
     *  The callers send the sum of checked persons so that the subscriber can display it
     *
     * @param total
     */
    setCheckedTotalPersons(total: number) {
        this._checked.next(total)
    }

    /** 
     * Caller(s):
     *  language-bar.component.ts
     * 
     * Subscriber(s):
     *  nav-wide.component.ts
     * 
     * Description:
     *  The caller(s) send the language so that the subscriber(s) can display the appropriate messages
     */
    updateLanguage(message: string) {
        this._language.next(message)
    }

    /**
     * Caller(s):
     *  transfer-form.component.ts
     * 
     * Subscriber(s):
     *  transfer-list.component.ts
     * 
     * Description:
     *  The caller(s) send the id of the deleted record so that the subscriber(s) can find the table row and remove it
     */
    removeTableRow(rowIndex: number) {
        this._tableRow.next(rowIndex)
    }

}
