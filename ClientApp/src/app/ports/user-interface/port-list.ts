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
import { Port } from '../classes/port'

@Component({
    selector: 'port-list',
    templateUrl: './port-list.html',
    styleUrls: ['../../shared/styles/lists.css']
})

export class PortListComponent implements OnInit, OnDestroy {

    //#region 

    filteredRecords: Port[] = []
    ngUnsubscribe = new Subject<void>()
    records: Port[] = []
    resolver = 'portList'
    searchTerm: string;
    unlisten: Unlisten
    url = '/ports'
    windowTitle = 'Ports'

    //#endregion

    //#region 
    headers = ['S', 'Id', 'Description']
    widths = ['40px', '0px', '']
    visibility = ['none', 'none', '']
    justify = ['center', 'center', 'left']
    fields = ['', 'id', 'description']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

    ngOnInit(): void {
        this.setWindowTitle()
        this.getFilterFromLocalStorage()
        this.loadRecords()
        this.addShortcuts()
        this.subscribeToInteractionService()
        this.onFilter(this.searchTerm)
    }

    ngOnDestroy(): void {
        this.clearLocalStorageFilter()
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    public onFilter(query: string) {
        this.searchTerm = query
        this.filteredRecords = query ? this.records.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGoBack(): void {
        localStorage.removeItem('searchTermPort')
        this.router.navigate(['/'])
    }

    public onNew() {
        this.router.navigate([this.url + '/new'])
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (): void => {
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

    private clearLocalStorageFilter() {
        localStorage.removeItem('searchTermPort')
    }

    private editRecord(id: number) {
        localStorage.setItem('searchTermPort', this.searchTerm !== null ? this.searchTerm : '')
        this.router.navigate([this.url, id])
    }

    private focus(event: KeyboardEvent, element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getFilterFromLocalStorage() {
        this.searchTerm = localStorage.getItem('searchTermPort')
    }

    private loadRecords() {
        const portListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (portListResolved.error === null) {
            this.records = portListResolved.list
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
