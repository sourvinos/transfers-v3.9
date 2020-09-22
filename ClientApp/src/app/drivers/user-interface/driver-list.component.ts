import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { MessageService } from 'src/app/shared/services/message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Driver } from '../classes/driver'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { LabelMessageService } from 'src/app/shared/services/label.service'

@Component({
    selector: 'driver-list',
    templateUrl: './driver-list.component.html',
    styleUrls: ['../../../assets/styles/lists.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class DriverListComponent implements OnInit, OnDestroy {

    //#region variables

    filteredRecords: Driver[] = []
    ngUnsubscribe = new Subject<void>()
    records: Driver[] = []
    resolver = 'driverList'
    searchTerm = ''
    unlisten: Unlisten
    baseUrl = '/drivers'
    newUrl = this.baseUrl + '/new'
    windowTitle = 'Drivers'
    localStorageSearchTerm = 'searchTermDriver'
    feature = 'driverList'

    //#endregion

    //#region table

    headers = ['S', 'Id', this.onGetLabel('headerName'), this.onGetLabel('headerPhones'), '']
    widths = ['40px', '0px', '50%', '', '56px']
    visibility = ['none', 'none']
    justify = ['center', 'center', 'left', 'left', 'center']
    fields = ['', 'id', 'description', 'phones', '']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private labelService: LabelMessageService, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

    //#region lifecycle hooks
    ngOnInit() {
        this.setWindowTitle()
        this.getFilterFromLocalStorage()
        this.loadRecords()
        this.addShortcuts()
        this.subscribeToInteractionService()
        this.onFilter(this.searchTerm)
        this.focus('searchTerm')
    }

    ngOnDestroy() {
        this.updateLocalStorageWithFilter()
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onFilter(query: string) {
        this.searchTerm = query
        this.filteredRecords = query ? this.records.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGetLabel(id: string) {
        return this.labelService.getLabelDescription(this.feature, id)
    }

    //#endregion

    //#region private methods
    
    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'goBack')
            },
            'Alt.F': () => {
                this.focus('searchTerm')
            },
            'Alt.N': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'new')
            }
        }, {
            priority: 0,
            inputs: true
        })
    }

    private editRecord(id: number) {
        this.router.navigate([this.baseUrl, id])
    }

    private focus(element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getFilterFromLocalStorage() {
        this.searchTerm = localStorage.getItem(this.localStorageSearchTerm) != null ? localStorage.getItem(this.localStorageSearchTerm) : ''
    }

    private loadRecords() {
        const driverListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (driverListResolved.error === null) {
            this.records = driverListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.description > b.description) ? 1 : -1)
        } else {
            this.showSnackbar(this.messageService.noContactWithServer(), 'error')
        }
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string, type: string) {
        this.snackbarService.open(message, type)
    }

    private subscribeToInteractionService() {
        this.interactionService.record.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
            this.updateLocalStorageWithFilter()
            this.editRecord(response['id'])
        })
    }

    private updateLocalStorageWithFilter() {
        localStorage.setItem(this.localStorageSearchTerm, this.searchTerm)
    }

    //#endregion

}
