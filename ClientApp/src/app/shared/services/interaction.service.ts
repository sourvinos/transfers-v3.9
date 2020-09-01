import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class InteractionService {

    _record = new Subject<string[]>()
    _checked = new Subject<number>()
    _refreshList = new Subject<any>()
    _language = new Subject<string>()

    record = this._record.asObservable()
    checked = this._checked.asObservable()
    refreshList = this._refreshList.asObservable()
    language = this._language.asObservable()

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
     *  Custom-table.ts
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

    updateLanguage(message: string) {
        this._language.next(message)
    }

}
