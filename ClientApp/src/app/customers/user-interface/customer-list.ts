import { Component, OnDestroy, OnInit, HostListener } from '@angular/core'
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
    searchTerm = '';
    url = '/customers'
    windowTitle = 'Customers'

    //#endregion

    //#region

    headers = ['S', 'Id', 'Description', 'Phones', 'Email']
    widths = ['40px', '0px', '50%', '25%', '']
    visibility = ['none', 'none', '', '', '']
    justify = ['center', 'center', 'left', 'left', 'left']
    fields = ['', 'id', 'description', 'phones', 'email']

    //#endregion

    @HostListener('keyup', ['$event']) onkeyup(event: KeyboardEvent) {
        this.handleKeyboardEvents(event)
    }

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

    ngOnInit(): void {
        // this.setWindowTitle()
        // this.getFilterFromLocalStorage()
        // this.loadRecords()
        this.subscribeToInteractionService()
        // this.onFilter(this.searchTerm)
    }

    ngOnDestroy(): void {
        this.clearLocalStorageFilter()
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    public onFilter(query: string): void {
        this.searchTerm = query
        this.filteredRecords = query ? this.filterArray(this.records, this.searchTerm) : this.records
    }

    public onGoBack(): void {
        localStorage.removeItem('searchTermCustomer')
        this.router.navigate(['/'])
    }

    public onNew(): void {
        this.router.navigate([this.url + '/new'])
    }

    private clearLocalStorageFilter() {
        localStorage.removeItem('searchTermCustomer')
    }

    private editRecord(id: number) {
        this.router.navigate([this.url, id])
    }

    private filterArray(records: any[], query: string) {
        return records.filter(p => p.description.toLowerCase().includes(query.toLowerCase()))
    }

    private focus(event: KeyboardEvent, element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getFilterFromLocalStorage() {
        this.searchTerm = localStorage.getItem('searchTermCustomer')
    }

    private handleKeyboardEvents(event: KeyboardEvent) {
        if (event.code === 'Escape') { this.onGoBack() }
        if (event.altKey && event.code === 'KeyF') { this.focus(event, 'searchTerm') }
        if (event.altKey && event.code === 'KeyN') { this.buttonClickService.clickOnButton(event, 'new') }
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

    subscribeToInteractionService() {
        return this.interactionService.record.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
            // this.updateLocalStorageWithFilter()
            // this.editRecord(response['id'])
            console.log(response)
        })
    }

    private updateLocalStorageWithFilter() {
        localStorage.setItem('searchTermCustomer', this.searchTerm)
    }

}
