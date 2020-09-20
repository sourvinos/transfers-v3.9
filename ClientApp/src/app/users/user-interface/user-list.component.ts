import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { User } from 'src/app/account/classes/user'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { SnackbarMessageService } from 'src/app/shared/services/snackbar-message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['../../../assets/styles/lists.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class UserListComponent implements OnInit, OnDestroy {

    //#region   

    filteredRecords: User[] = []
    ngUnsubscribe = new Subject<void>()
    records: User[] = []
    resolver = 'userList'
    searchTerm = ''
    unlisten: Unlisten
    baseUrl = '/users'
    newUrl = this.baseUrl + '/new'
    windowTitle = 'Users'
    localStorageSearchTerm = 'searchTermUser'

    //#endregion

    //#region 

    headers = ['S', 'Id', 'Display name', 'User name', 'Email', '']
    widths = ['40px', '', '30%', '30%', '', '56px']
    visibility = ['none', 'none']
    justify = ['center', 'left', 'left', 'left', 'left', 'center']
    fields = ['', 'id', 'displayname', 'username', 'email', '']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: SnackbarMessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

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
        this.filteredRecords = query ? this.records.filter(p => p.username.toLowerCase().includes(query.toLowerCase())) : this.records
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
        const userListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (userListResolved.error === null) {
            this.records = userListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.username > b.username) ? 1 : -1)
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

}
