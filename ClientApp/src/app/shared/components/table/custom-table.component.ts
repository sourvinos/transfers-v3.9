import { AfterViewInit, Component, DoCheck, Input, IterableChanges, IterableDiffer, IterableDiffers, OnInit } from '@angular/core'
import { IndexInteractionService } from 'src/app/shared/services/index-interaction.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { slideToLeft } from 'src/app/shared/animations/animations'
import { Subject } from 'rxjs'

@Component({
    selector: 'custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.css'],
    animations: [slideToLeft]
})

export class CustomTableComponent implements OnInit, AfterViewInit, DoCheck {

    @Input() records: any[]
    @Input() headers: any
    @Input() widths: any
    @Input() visibility: any
    @Input() justify: any
    @Input() fields: any

    currentRow = 0
    tableContainer: any
    table: any
    tableInput: any
    rowHeight = 0
    rowCount = 0
    checked = false
    checkedIds: string[] = []
    totalPersons = 0
    sortOrder = 'desc'
    differences: IterableDiffer<any>;
    randomTableId = Math.floor(Math.random() * 1000) + 1
    tableAnimations: true
    ngUnsubscribe = new Subject<void>()

    constructor(private interactionService: InteractionService, private indexInteractionService: IndexInteractionService, private iterableDiffers: IterableDiffers) { }

    ngOnInit() {
        this.differences = this.iterableDiffers.find(this.records).create()
    }

    ngAfterViewInit() {
        this.initVariables()
        this.onGotoRow(1)
    }

    ngDoCheck() {
        const changes: IterableChanges<any> = this.differences.diff(this.records)
        if (changes) {
            this.checked = false
        }
    }

    onCheckKeyboard(event: any) {
        switch (event.keyCode) {
            case 38: this.onGotoRow('Up'); break
            case 40: this.onGotoRow('Down'); break
            case 13: this.sendRowToService(); break
            default: break
        }
    }

    onDomChange() {
        this.onGotoRow(1)
    }

    onHeaderClick(columnName: string, sortOrder: string, column: any) {
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
            localStorage.setItem('selectedIds', JSON.stringify(this.checkedIds))
            this.interactionService.setCheckedTotalPersons(this.totalPersons)
        } else {
            this.records.sort(this.compareValues(columnName, sortOrder))
            this.sortOrder = this.sortOrder === 'asc' ? this.sortOrder = 'desc' : this.sortOrder = 'asc'
        }
    }

    onSortMe(columnName: string, sortOrder: string) {
        this.records.sort(this.compareValues(columnName, sortOrder))
        this.sortOrder = this.sortOrder === 'asc' ? this.sortOrder = 'desc' : this.sortOrder = 'asc'
    }

    public onGotoRow(key: any) {
        console.log(key)
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

    onToggleCheckBox(row: number) {
        this.checkedIds = []
        this.totalPersons = 0
        this.table.rows[row].classList.toggle('checked')
        this.table.querySelectorAll('tr.checked').forEach((element: { childNodes: { innerText: string }[] }) => {
            this.checkedIds.push(element.childNodes[1].innerText)
            this.totalPersons += parseInt(element.childNodes[11].innerText, 10)
        })
        localStorage.setItem('selectedIds', JSON.stringify(this.checkedIds))
        this.interactionService.setCheckedTotalPersons(this.totalPersons)
    }

    private compareValues(key: string, order = 'asc') {
        return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: string) => any }, b: { [x: string]: any; hasOwnProperty: (arg0: string) => any }) {
            if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) { return 0 }
            let comparison = 0
            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
            comparison = varA > varB ? 1 : -1
            return ((order === 'desc') ? (comparison * -1) : comparison)
        }
    }

    private initVariables() {
        this.table = document.getElementById('custom-table-' + this.randomTableId)
        this.tableContainer = this.table.parentNode.parentNode
        this.rowHeight = 46
        this.rowCount = this.table.rows.length - 1
        document.getElementById('custom-table-input-' + this.randomTableId).style.zIndex = '-1'
        document.getElementById('custom-table-input-' + this.randomTableId).style.position = 'absolute'
    }

    private isRowIntoView(row: HTMLTableRowElement, direction: string) {
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

    private selectRow(table: HTMLTableElement, direction: any) {
        if (!isNaN(direction)) {
            this.currentRow = parseInt(direction, 10)
        } else {
            if (direction === 'up') { this.currentRow-- }
            if (direction === 'down') { ++this.currentRow }
        }
        document.getElementById('custom-table-input-' + this.randomTableId).focus()
        console.log(this.rowHeight)
        if (this.rowHeight !== 0) {
            table.rows[this.currentRow].classList.add('selected')
        }
    }

    private sendRowToIndexService() {
        this.indexInteractionService.sendObject(this.records[this.currentRow - 1])
    }

    public sendRowToService() {
        if (document.getElementsByClassName('mat-dialog-container').length === 0) {
            this.interactionService.sendObject(this.records[this.currentRow - 1])
        } else {
            this.indexInteractionService.action(true)
        }
    }

    private async unselectAllRows() {
        await this.table.querySelectorAll('tr').forEach((element: { classList: { remove: (arg0: string) => void } }) => {
            element.classList.remove('selected')
        })
    }

    private unselectRow() {
        this.table.rows[this.currentRow].classList.remove('selected')
    }

}
