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
import { MessageService } from 'src/app/shared/services/message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'

@Component({
    selector: 'user-list',
    templateUrl: './user-list.html',
    styleUrls: ['../../shared/styles/lists.css']
})

export class UserListComponent implements OnInit, OnDestroy {

    //#region   

    filteredRecords: User[] = []
    ngUnsubscribe = new Subject<void>()
    records: User[] = []
    resolver = 'userList'
    searchTerm: string
    unlisten: Unlisten
    url = '/users'
    windowTitle = 'Users'

    //#endregion

    //#region 

    headers = ['S', 'Id', 'Display name', 'User name', 'Email']
    widths = ['40px', '', '30%', '30%', '']
    visibility = ['none', 'none', '', '', '', '']
    justify = ['center', 'left', 'left', 'left', 'left']
    fields = ['', 'id', 'displayname', 'username', 'email']

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

    public onFilter(query: string): void {
        this.filteredRecords = query ? this.records.filter(p => p.username.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGoBack(): void {
        localStorage.removeItem('searchTermUser')
        this.router.navigate(['/'])
    }

    public onNew(): void {
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
        localStorage.removeItem('searchTermUser')
    }

    private editRecord(id: number) {
        localStorage.setItem('searchTermUser', this.searchTerm !== null ? this.searchTerm : '')
        this.router.navigate([this.url, id])
    }

    private focus(event: KeyboardEvent, element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getFilterFromLocalStorage() {
        this.searchTerm = localStorage.getItem('searchTermUser')
    }

    private loadRecords() {
        const userListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (userListResolved.error === null) {
            this.records = userListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.username > b.username) ? 1 : -1)
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
