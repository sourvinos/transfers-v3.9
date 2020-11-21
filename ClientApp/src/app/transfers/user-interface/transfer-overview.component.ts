import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { TransferOverviewViewModel } from '../classes/transferOverviewViewModel'
import { MatDialog } from '@angular/material/dialog'
import { DialogSimpleComponent } from 'src/app/shared/components/dialog-simple/dialog-simple.component'

@Component({
    selector: 'transfer-overview',
    templateUrl: './transfer-overview.component.html',
    styleUrls: ['./transfer-overview.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferOverviewComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>()
    private resolver = 'transferOverview'
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public feature = 'transferOverview'
    public isVisible = false

    //#endregion

    //#region particular variables

    public queryResult = new TransferOverviewViewModel()
    public listResolved: any

    //#endregion

    constructor(
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private buttonClickService: ButtonClickService,
        private helperService: HelperService,
        private keyboardShortcutsService: KeyboardShortcuts,
        private messageLabelService: MessageLabelService,
        private messageSnackbarService: MessageSnackbarService,
        private router: Router,
        private snackbarService: SnackbarService,
        private titleService: Title
    ) {
        this.router.events.subscribe(() => {
            this.loadRecords()
        })
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.addShortcuts()
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack(): void {
        this.router.navigate(['/'])
    }

    public onShowDetails(header: string, data: any): void {
        this.dialog.open(DialogSimpleComponent, {
            height: '600px',
            data: {
                header: header,
                records: data
            }
        })
    }

    //#endregion

    //#region private methods

    private addShortcuts(): void {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': () => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.onGoBack()
                }
            },
            'Alt.A': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'assignDriver')
            },
            'Alt.C': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'createPdf')
            },
            'Alt.N': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'new')
            },
            'Alt.S': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'search')
            }
        }, {
            priority: 2,
            inputs: true
        })
    }

    private loadRecords(): void {
        const listResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (listResolved.error === null) {
            this.populateTotals(listResolved.result)
            this.populatePercents(listResolved.result)
            this.populatePersonsPerCustomer(listResolved.result)
            this.populatePersonsPerDestination(listResolved.result)
            this.populatePersonsPerRoute(listResolved.result)
            this.populatePersonsPerDriver(listResolved.result)
            this.populatePersonsPerPort(listResolved.result)
        } else {
            this.onGoBack()
            this.showSnackbar(this.messageSnackbarService.filterError(this.listResolved.error), 'error')
        }
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string, type: string): void {
        this.snackbarService.open(message, type)
    }

    private populateTotals(result: { totalPersons: number; totalAdults: number; totalKids: number; totalFree: number }): void {
        this.queryResult.persons = result.totalPersons
        this.queryResult.adults = result.totalAdults
        this.queryResult.kids = result.totalKids
        this.queryResult.free = result.totalFree
    }

    private populatePercents(result: { totalAdults: number; totalPersons: number; totalKids: number; totalFree: number }): void {
        this.queryResult.percent = (100 * result.totalPersons / result.totalPersons).toFixed(2)
        this.queryResult.adultsPercent = (100 * result.totalAdults / result.totalPersons).toFixed(2)
        this.queryResult.kidsPercent = (100 * result.totalKids / result.totalPersons).toFixed(2)
        this.queryResult.freePercent = (100 * result.totalFree / result.totalPersons).toFixed(2)
    }

    private populatePersonsPerCustomer(result: { totalPersonsPerCustomer: any[] }): void {
        this.queryResult.personsPerCustomer = result.totalPersonsPerCustomer
    }

    private populatePersonsPerDestination(result: { totalPersonsPerDestination: any[] }): void {
        this.queryResult.personsPerDestination = result.totalPersonsPerDestination
    }

    private populatePersonsPerRoute(result: { totalPersonsPerRoute: any[] }): void {
        this.queryResult.personsPerRoute = result.totalPersonsPerRoute
    }

    private populatePersonsPerDriver(result: { totalPersonsPerDriver: any[] }): void {
        this.queryResult.personsPerDriver = result.totalPersonsPerDriver
    }

    private populatePersonsPerPort(result: { totalPersonsPerPort: any[] }): void {
        this.queryResult.personsPerPort = result.totalPersonsPerPort
    }

    //#endregion

}
