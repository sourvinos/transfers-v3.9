import { fromEvent, Subscription } from 'rxjs'
import { MessageLabelService } from './../../services/messages-label.service'
import { Component, Input, IterableChanges, IterableDiffer, IterableDiffers, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { IndexInteractionService } from 'src/app/shared/services/index-interaction.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { MessageTableService } from '../../services/messages-table.service'
import { HelperService } from '../../services/helper.service'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { filter, take } from 'rxjs/operators'
import { listAnimation } from '../../animations/animations'

@Component({
    selector: 'custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.css'],
    animations: [listAnimation]
})

export class CustomTableComponent {

    //#region variables

    @Input() feature: string
    @Input() fields: any
    @Input() headers: any
    @Input() justify: any
    @Input() records: any[]
    @Input() visibility: any
    @Input() widths: any
    @Input() highlightFirstRow: boolean

    @ViewChild('contextMenu') contextMenu: TemplateRef<any>

    checked = false
    checkedIds: string[] = []
    currentRow = 0
    differences: IterableDiffer<any>;
    overlayRef: OverlayRef | null
    randomTableId = Math.floor(Math.random() * 1000) + 1
    rowCount = 0
    rowHeight = 0
    sortOrder = 'desc'
    subscription: Subscription
    table: any
    tableContainer: any
    totalPersons = 0

    //#endregion

    constructor(private helperService: HelperService, private indexInteractionService: IndexInteractionService, private interactionService: InteractionService, private iterableDiffers: IterableDiffers, private messageLabelService: MessageLabelService, private messageTableService: MessageTableService, private overlay: Overlay, public viewContainerRef: ViewContainerRef) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.differences = this.iterableDiffers.find(this.records).create()
    }

    ngAfterViewInit(): void {
        this.initVariables()
        if (this.highlightFirstRow)
            this.onGotoRow(1)
    }

    ngDoCheck(): void {
        const changes: IterableChanges<any> = this.differences.diff(this.records)
        if (changes) {
            this.checked = false
        }
    }

    //#endregion

    //#region public methods

    public onCheckKeyboard(event: any): void {
        switch (event.keyCode) {
            case 38: this.onGotoRow('Up'); break
            case 40: this.onGotoRow('Down'); break
            case 13: this.sendRowToService(); break
            default: break
        }
    }

    public onDomChange(): void {
        this.onGotoRow(1)
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGetRowMenu(id: string): string {
        return this.messageTableService.getDescription('table', id)
    }

    public onHeaderClick(columnName: string, sortOrder: string, column: any): void {
        if (column.toElement.cellIndex === 0) {
            this.checked = !this.checked
            this.checkedIds = []
            this.totalPersons = 0
            this.table.querySelectorAll('tbody tr').forEach((element: { classList: { add: (arg0: string) => void; remove: (arg0: string) => void }; childNodes: { innerText: string }[] }) => {
                if (this.checked) {
                    element.classList.add('checked')
                    this.checkedIds.push(element.childNodes[1].innerText)
                    this.totalPersons += parseInt(element.childNodes[11].innerText, 10)
                } else {
                    element.classList.remove('checked')
                }
            })
            this.helperService.saveItem('selectedIds', JSON.stringify(this.checkedIds))
            this.interactionService.setCheckedTotalPersons(this.totalPersons)
        } else {
            this.records.sort(this.compareValues(columnName, sortOrder))
            this.sortOrder = this.sortOrder === 'asc' ? this.sortOrder = 'desc' : this.sortOrder = 'asc'
        }
    }

    public onOpenContextMenu({ x, y }: MouseEvent, record: any): void {
        this.closeContextMenu()
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo({ x, y })
            .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 1 }])
        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close()
        })
        this.overlayRef.attach(new TemplatePortal(this.contextMenu, this.viewContainerRef, {
            $implicit: record
        }))
        this.subscription = fromEvent<MouseEvent>(document, 'click').pipe(filter(event => {
            const clickTarget = event.target as HTMLElement
            return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget)
        }), take(1)).subscribe(() => {
            this.closeContextMenu()
        })
    }

    public onSortMe(columnName: string, sortOrder: string): void {
        this.records.sort(this.compareValues(columnName, sortOrder))
        this.sortOrder = this.sortOrder === 'asc' ? this.sortOrder = 'desc' : this.sortOrder = 'asc'
    }

    public onGotoRow(key: any): void {
        if (!isNaN(key)) {
            this.unselectAllRows().then(() => {
                this.selectRow(this.table, key)
                this.sendRowToIndexService()
            })
        }
        if (key === 'Up' && this.currentRow > 1) {
            this.unselectRow()
            this.selectRow(this.table, 'up')
            this.sendRowToIndexService()
            if (!this.isRowIntoView(this.table.rows[this.currentRow], key)) {
                this.tableContainer.scrollTop = (this.currentRow - 1) * this.rowHeight
            }
        }
        if (key === 'Down' && this.currentRow < this.records.length) {
            this.unselectRow()
            this.selectRow(this.table, 'down')
            this.sendRowToIndexService()
            if (!this.isRowIntoView(this.table.rows[this.currentRow], key)) {
                document.getElementById(this.randomTableId + '-' + this.currentRow.toString()).scrollIntoView({ block: 'end' })
            }
        }
    }

    public onToggleCheckBox(row: number): void {
        this.checkedIds = []
        this.totalPersons = 0
        this.table.rows[row].classList.toggle('checked')
        this.table.querySelectorAll('tr.checked').forEach((element: { childNodes: { innerText: string }[] }) => {
            this.checkedIds.push(element.childNodes[1].innerText)
            this.totalPersons += parseInt(element.childNodes[11].innerText, 10)
        })
        this.helperService.saveItem('selectedIds', JSON.stringify(this.checkedIds))
        this.interactionService.setCheckedTotalPersons(this.totalPersons)
    }

    public sendRowToService(): void {
        this.closeContextMenu()
        if (document.getElementsByClassName('mat-dialog-container').length === 0) {
            this.interactionService.sendObject(this.records[this.currentRow - 1])
        } else {
            this.indexInteractionService.action(true)
        }
    }

    //#endregion

    //#region private methods

    private closeContextMenu(): void {
        this.subscription && this.subscription.unsubscribe()
        if (this.overlayRef) {
            this.overlayRef.dispose()
            this.overlayRef = null
        }
    }

    private compareValues(key: string, order = 'asc'): any {
        return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: string) => any }, b: { [x: string]: any; hasOwnProperty: (arg0: string) => any }): number {
            if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) { return 0 }
            let comparison = 0
            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
            comparison = varA > varB ? 1 : -1
            return ((order === 'desc') ? (comparison * -1) : comparison)
        }
    }

    private focusOnHiddenInput(): void {
        setTimeout(() => {
            document.getElementById('custom-table-input-' + this.randomTableId).focus()
        }, 300)
    }

    private initVariables(): void {
        this.table = document.getElementById('custom-table-' + this.randomTableId)
        this.tableContainer = this.table.parentNode.parentNode
        this.rowHeight = 41
        this.rowCount = this.table.rows.length - 1
        document.getElementById('custom-table-input-' + this.randomTableId).style.zIndex = '-1'
        document.getElementById('custom-table-input-' + this.randomTableId).style.position = 'absolute'
    }

    private isRowIntoView(row: HTMLTableRowElement, direction: string): boolean {
        const rowOffsetTop = row.offsetTop
        const scrollTop = this.tableContainer.scrollTop
        const rowTopPlusHeight = rowOffsetTop + row.offsetHeight
        const indexTopPlusHeight = scrollTop + this.tableContainer.offsetHeight
        if (direction === 'Up') {
            if (indexTopPlusHeight - rowOffsetTop + this.rowHeight < this.tableContainer.offsetHeight) {
                return true
            } else {
                return false
            }
        }
        if (direction === 'Down') {
            if (rowTopPlusHeight <= indexTopPlusHeight) {
                return true
            } else {
                return false
            }
        }
    }

    private selectRow(table: HTMLTableElement, direction: any): void {
        if (!isNaN(direction)) {
            this.currentRow = parseInt(direction, 10)
        } else {
            if (direction === 'up') { this.currentRow-- }
            if (direction === 'down') { ++this.currentRow }
        }
        this.focusOnHiddenInput()
        if (this.table.rows.length > 1)
            table.rows[this.currentRow].classList.add('selected')
    }

    private sendRowToIndexService(): void {
        this.indexInteractionService.sendObject(this.records[this.currentRow - 1])
    }

    private async unselectAllRows(): Promise<void> {
        await this.table.querySelectorAll('tr').forEach((element: { classList: { remove: (arg0: string) => void } }) => {
            element.classList.remove('selected')
        })
    }

    private unselectRow(): void {
        this.table.rows[this.currentRow].classList.remove('selected')
    }

    //#endregion

}
