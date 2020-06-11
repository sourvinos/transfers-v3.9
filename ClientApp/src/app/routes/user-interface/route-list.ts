import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListResolved } from 'src/app/shared/classes/list-resolved';
import { ButtonClickService } from 'src/app/shared/services/button-click.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { InteractionService } from 'src/app/shared/services/interaction.service';
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Route } from '../classes/route';

@Component({
    selector: 'route-list',
    templateUrl: './route-list.html',
    styleUrls: ['../../shared/styles/lists.css']
})

export class RouteListComponent implements OnInit, OnDestroy {

    //#region 

    url = '/routes'
    records: Route[] = []
    filteredRecords: Route[] = []
    resolver = 'routeList'
    unlisten: Unlisten
    ngUnsubscribe = new Subject<void>()
    searchTerm: string

    //#endregion

    //#region 
    headers = ['S', 'Id', 'Description', 'Full description']
    widths = ['40px', '0px', '150px', '']
    visibility = ['none', 'none', '', '']
    justify = ['center', 'center', 'center', 'left']
    fields = ['', 'id', 'description', 'fullDescription']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService) {
        this.searchTerm = localStorage.getItem('searchTerm')
        this.loadRecords()
    }

    ngOnInit() {
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
        this.filteredRecords = query ? this.records.filter(p => p.fullDescription.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGoBack() {
        localStorage.removeItem('searchTerm')
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
        localStorage.setItem('searchTerm', this.searchTerm !== null ? this.searchTerm : '')
        this.router.navigate([this.url, id])
    }

    private focus(event: KeyboardEvent, element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private loadRecords() {
        const routeListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (routeListResolved.error === null) {
            this.records = routeListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.fullDescription > b.fullDescription) ? 1 : -1)
        } else {
            this.showSnackbar(this.messageService.noContactWithApi(), 'error')
        }
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
