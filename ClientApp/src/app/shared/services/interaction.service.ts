import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class InteractionService {

    //#region variables

    private _record = new Subject<string[]>()
    private _checked = new Subject<number>()
    private _refreshList = new Subject<any>()
    private _tableRow = new Subject()
    private _recordCount = new Subject<number>()

    public record = this._record.asObservable()
    public checked = this._checked.asObservable()
    public refreshList = this._refreshList.asObservable()
    public tableRow = this._tableRow.asObservable()
    public recordCount = this._recordCount.asObservable()

    //#endregion

    //#region public methods

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
    public mustRefreshList(): void {
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
    public sendObject(record: any): void {
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
    public setCheckedTotalPersons(total: number): void {
        this._checked.next(total)
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
    public removeTableRow(rowIndex: number): void {
        this._tableRow.next(rowIndex)
    }

    /**
     * Caller(s):
     *  app.component.ts
     * 
     * Subscriber(s):
     *  announcement.component.ts
     * 
     * Description:
     *  The caller(s) send the count so that the subscriber(s) can display it
     */
    public getRecordCount(count: number): void {
        this._recordCount.next(count)
    }

    //#endregion

}
