import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteService } from 'src/app/routes/classes/route.service';
import { ListResolved } from 'src/app/shared/classes/list-resolved';
import { ButtonClickService } from 'src/app/shared/services/button-click.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { InteractionService } from 'src/app/shared/services/interaction.service';
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PickupPoint } from '../classes/pickupPoint';

@Component({
    selector: 'pickuppoint-list',
    templateUrl: './pickupPoint-list.html',
    styleUrls: ['../../shared/styles/lists.css', './pickupPoint-list.css']
})

export class PickupPointListComponent implements OnInit, OnDestroy {

    //#region 

    records: PickupPoint[] = []
    filteredRecords: PickupPoint[] = []
    resolver = 'pickupPointList'
    unlisten: Unlisten
    ngUnsubscribe = new Subject<void>()
    searchTerm: string;

    //#endregion

    //#region 

    routeDescription: string

    //#endregion

    //#region 

    headers = ['S', 'Id', 'Description', 'Exact point', 'Time']
    widths = ['40px', '0', '45%', '', '100px']
    visibility = ['none', 'none', '', '', '']
    justify = ['center', 'center', 'left', 'left', 'center']
    fields = ['', 'id', 'description', 'exactPoint', 'time']

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private interactionService: InteractionService, private keyboardShortcutsService: KeyboardShortcuts, private location: Location, private messageService: MessageService, private routeService: RouteService, private router: Router, private snackbarService: SnackbarService) {
        this.activatedRoute.params.subscribe(p => {
            this.getRouteDescription(p.routeId)
        })
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
        this.filteredRecords = query ? this.records.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.records
    }

    public onGoBack() {
        localStorage.removeItem('searchTerm')
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
    }

    public onNew() {
        this.router.navigate([this.location.path() + '/pickupPoint/new'])
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'goBack')
            },
            'Alt.F': (event: KeyboardEvent) => {
                this.focus(event, 'searchTerm')
            },
            'Alt.N': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'new')
            },
        }, {
            priority: 0,
            inputs: true
        })
    }

    private editRecord(id: number) {
        localStorage.setItem('searchTerm', this.searchTerm !== null ? this.searchTerm : '')
        this.router.navigate(['pickupPoint/', id], { relativeTo: this.activatedRoute })
    }

    private focus(event: KeyboardEvent, element: string) {
        event.preventDefault()
        this.helperService.setFocus(element)
    }

    private getRouteDescription(routeId: number) {
        this.routeService.getSingle(routeId).subscribe(result => {
            this.routeDescription = result.description
        })
    }

    private loadRecords() {
        const pickupPointListResolved: ListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (pickupPointListResolved.error === null) {
            this.records = pickupPointListResolved.list
            this.filteredRecords = this.records.sort((a, b) => (a.description > b.description) ? 1 : -1)
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
