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
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Route } from '../classes/route'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'

@Component({
    selector: 'route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['../../../assets/styles/lists.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class RouteListComponent implements OnInit, OnDestroy {

    //#region variables

    filteredRecords: Route[] = []
    ngUnsubscribe = new Subject<void>()
    records: Route[] = []
    resolver = 'routeList'
    searchTerm = ''
    unlisten: Unlisten
    baseUrl = '/routes'
    newUrl = this.baseUrl + '/new'
    windowTitle = 'Routes'
    localStorageSearchTerm = 'searchTermRoute'
    feature = 'routeList'

    //#endregion

    //#region table

    headers = ['S', 'Id', this.onGetLabel('headerDescription'), this.onGetLabel('headerFullDescription'), '']
    widths = ['40px', '0px', '150px', '', '56px']
    visibility = ['none', 'none']
    justify = ['center', 'center', 'center', 'left', 'center']
    fields = ['', 'id', 'description', 'fullDescription', '']

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute,
        private buttonClickService: ButtonClickService,
        private helperService: HelperService,
        private interactionService: InteractionService,
        private keyboardShortcutsService: KeyboardShortcuts,
        private messageLabelService: MessageLabelService,
        private messageSnackbarService: MessageSnackbarService,
        private router: Router,
        private snackbarService: SnackbarService,
        private titleService: Title
    ) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.getFilterFromLocalStorage()
        this.loadRecords()
        this.addShortcuts()
        this.subscribeToInteractionService()
        this.onFilter(this.searchTerm)
        this.focus('searchTerm')
    }

    ngOnDestroy(): void {
        this.updateLocalStorageWithFilter()
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onFilter(query: string): void {
        this.searchTerm = query
        this.filteredRecords = query ? this.records.filter(p => p.fullDescription.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    //#endregion

    //#region private methods

    private addShortcuts(): void {
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

    private editRecord(id: number): void {
        this.router.navigate([this.baseUrl, id])
    }

    private focus(element: string): void {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getFilterFromLocalStorage(): void {
        this.searchTerm = localStorage.getItem(this.localStorageSearchTerm) != null ? localStorage.getItem(this.localStorageSearchTerm) : ''
    }

    private loadRecords(): void {
        const routeListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (routeListResolved.error === null) {
            this.records = routeListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.fullDescription > b.fullDescription) ? 1 : -1)
        } else {
            this.showSnackbar(this.messageSnackbarService.noContactWithServer(), 'error')
        }
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string, type: string): void {
        this.snackbarService.open(message, type)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.record.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
            this.updateLocalStorageWithFilter()
            this.editRecord(response['id'])
        })
    }

    private updateLocalStorageWithFilter(): void {
        localStorage.setItem(this.localStorageSearchTerm, this.searchTerm)
    }

    //#endregion

}
