import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { MessageService } from 'src/app/shared/services/message.service'
import { ListResolved } from '../../shared/classes/list-resolved'
import { Customer } from '../classes/customer'
import { SnackbarService } from './../../shared/services/snackbar.service'
import { takeUntil } from 'rxjs/operators'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'

@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.html',
    styleUrls: ['../../shared/styles/lists.css']
})

export class CustomerListComponent implements OnInit, OnDestroy {

    //#region

    filteredRecords: Customer[] = []
    ngUnsubscribe = new Subject<void>()
    records: Customer[] = []
    resolver = 'customerList'
    searchTerm = ''
    unlisten: Unlisten
    baseUrl = '/customers'
    newUrl = this.baseUrl + '/new'
    windowTitle = 'Customers'
    localStorageSearchTerm = 'searchTermCustomer'

    //#endregion

    //#region

    headers = ['S', 'Id', 'Description', 'Phones', 'Email']
    widths = ['40px', '0px', '50%', '25%', '']
    visibility = ['none', 'none', '', '', '']
    justify = ['center', 'center', 'left', 'left', 'left']
    fields = ['', 'id', 'description', 'phones', 'email']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

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

    public onFilter(query: string) {
        this.searchTerm = query
        this.filteredRecords = query ? this.records.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.records
    }

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
        const customerListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (customerListResolved.error === null) {
            this.records = customerListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.description > b.description) ? 1 : -1)
        } else {
            this.showSnackbar(this.messageService.noContactWithApi(), 'error')
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

}
