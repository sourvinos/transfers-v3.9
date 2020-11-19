import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { TransferOverviewViewModel } from '../classes/transferOverviewViewModel'

@Component({
    selector: 'transfer-overview',
    templateUrl: './transfer-overview.component.html',
    styleUrls: ['./transfer-overview.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferOverviewComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>()
    private records: string[] = []
    private resolver = 'transferOverview'
    private unlisten: Unlisten
    private windowTitle = 'Transfers overview'
    public feature = 'transferOverview'

    //#endregion

    //#region particular variables

    private dateIn: string
    private mustRefresh = true
    public queryResult = new TransferOverviewViewModel()
    public a = []
    public b: any
    public c: any

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) {
        this.activatedRoute.params.subscribe((params: Params) => this.dateIn = params['dateIn'])
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
            console.log('Resolved', listResolved.result)
            // this.a = listResolved.result
            this.a.push(listResolved.result.totalPersons)
            this.a.push(listResolved.result.totalPersonsPerCustomer)
            console.log('Persons', this.a[0])
            console.log('Customer 1', this.a[1][0])
            console.log('Customer 2', this.a[1][1])
            console.log('Customer 3', this.a[1][2])
            // console.log(this.a.totalPersons)
            // console.log(this.a.totalPersonsPerCustomer)
            // console.log(this.a.totalPersonsPerCustomer[0])

            this.b = JSON.stringify(listResolved.result)
            this.b = JSON.parse(this.b)
            // this.flattenResults()
            console.log(this.b)
            console.log(this.b.totalPersonsPerCustomer)
            // console.log('Adults', this.queryResult.adults)
            // console.log('Flat', this.transfersFlat.adults)
            // console.log('Kids', listResolved.result.totalKids)
            // console.log('Free', listResolved.result.totalFree)
            // console.log('Total persons', listResolved.result.totalPersons)
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

    //#endregion

}
