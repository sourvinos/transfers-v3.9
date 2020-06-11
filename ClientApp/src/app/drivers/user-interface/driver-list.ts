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

@Component({
    selector: 'driver-list',
    templateUrl: './driver-list.html',
    styleUrls: ['../../shared/styles/lists.css']
})

export class DriverListComponent implements OnInit, OnDestroy {

    //#region 

    url = '/drivers'
    windowTitle = 'Drivers'
    records: Driver[] = []
    filteredRecords: Driver[] = []
    resolver = 'driverList'
    unlisten: Unlisten
    ngUnsubscribe = new Subject<void>()
    searchTerm: string;

    //#endregion

    //#region 

    headers = ['S', 'Id', 'Name', 'Phones']
    widths = ['40px', '0px', '50%', '']
    visibility = ['none', 'none', '', '']
    justify = ['center', 'center', 'left', 'left']
    fields = ['', 'id', 'description', 'phones']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

    ngOnInit() {
        this.setWindowTitle()
        this.getFilterFromLocalStorage();
        this.loadRecords()
        this.addShortcuts()
        this.subscribeToInteractionService()
        this.onFilter(this.searchTerm)
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    public onFilter(query: string) {
        this.searchTerm = query
        this.filteredRecords = query ? this.records.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGoBack() {
        localStorage.removeItem('searchTermDriver')
        this.router.navigate(['/'])
    }

    public onNew() {
        this.router.navigate([this.url + '/new'])
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent): void => {
                this.onGoBack()
            },
            'Alt.F': (event: KeyboardEvent): void => {
                this.focus(event, 'searchTerm')
            },
            'Alt.N': (event: KeyboardEvent): void => {
                this.buttonClickService.clickOnButton(event, 'new')
            }
        }, {
            priority: 0,
            inputs: true
        })
    }

    private editRecord(id: number) {
        localStorage.setItem('searchTermDriver', this.searchTerm !== null ? this.searchTerm : '')
        this.router.navigate([this.url, id])
    }

    private focus(event: KeyboardEvent, element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getFilterFromLocalStorage() {
        this.searchTerm = localStorage.getItem('searchTermDriver');
    }

    private loadRecords() {
        const driverListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (driverListResolved.error === null) {
            this.records = driverListResolved.list
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
            this.editRecord(response['id'])
        })
    }

}
