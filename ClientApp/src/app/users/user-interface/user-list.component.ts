import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { User } from 'src/app/account/classes/user'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['../../../assets/styles/lists.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class UserListComponent {

    //#region variables

    private baseUrl = '/users'
    private localStorageSearchTerm = 'searchTermUser'
    private ngUnsubscribe = new Subject<void>()
    private records: User[] = []
    private resolver = 'userList'
    private unlisten: Unlisten
    private windowTitle = 'Users'
    public feature = 'userList'
    public filteredRecords: User[] = []
    public highlightFirstRow = false
    public newUrl = this.baseUrl + '/new'
    public searchTerm = ''

    //#endregion

    //#region table

    headers = ['', 'Id', 'headerDisplayname', 'headerUsername', 'headerEmail', '']
    widths = ['40px', '', '30%', '30%', '', '56px']
    visibility = ['none', 'none']
    justify = ['center', 'left', 'left', 'left', 'left', 'center']
    types = ['', '', '', '', '', '']
    fields = ['', 'id', 'displayname', 'username', 'email', '']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.getFilterFromLocalStorage()
        this.loadRecords()
        this.addShortcuts()
        this.subscribeToInteractionService()
        this.updateLocalStorageWithCallerForm()
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
        this.filteredRecords = query ? this.records.filter(p => p.username.toLowerCase().includes(query.toLowerCase())) : this.records
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
        this.searchTerm = this.helperService.readItem(this.localStorageSearchTerm)
    }

    public onGoBack(): void {
        this.router.navigate(['/'])
    }

    private loadRecords(): void {
        const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (listResolved.error === null) {
            this.records = listResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.username > b.username) ? 1 : -1)
        } else {
            this.onGoBack()
            this.showSnackbar(this.messageSnackbarService.filterError(listResolved.error), 'error')
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

    private updateLocalStorageWithCallerForm(): void {
        this.helperService.saveItem('editUserCaller', 'list')
    }

    private updateLocalStorageWithFilter(): void {
        this.helperService.saveItem(this.localStorageSearchTerm, this.searchTerm)
    }

    //#endregion

}
