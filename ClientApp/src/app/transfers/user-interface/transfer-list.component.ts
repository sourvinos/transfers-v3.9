import { Location } from '@angular/common'
import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { DriverService } from 'src/app/drivers/classes/driver.service'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { TransferFlat } from '../classes/transfer-flat'
import { TransferPdfService } from '../classes/transfer-pdf.service'
import { TransferService } from '../classes/transfer.service'
import { TransferViewModel } from '../classes/transferViewModel'
import { TransferAssignDriverComponent } from './transfer-assign-driver.component'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'

@Component({
    selector: 'transfer-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferListComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

    //#region variables

    ngUnsubscribe = new Subject<void>()
    records: string[] = []
    resolver = 'transferList'
    unlisten: Unlisten
    windowTitle = 'Transfers'
    feature = 'transferList'

    //#endregion

    //#region particular variables

    dateIn: string
    queryResult = new TransferViewModel()
    queryResultClone = new TransferViewModel()
    totals: any[] = []
    selectedDestinations: string[] = []
    selectedCustomers: string[] = []
    selectedRoutes: string[] = []
    selectedDrivers: string[] = []
    selectedPorts: string[] = []
    transfersFlat: TransferFlat[] = []
    checkedDestinations = true
    checkedCustomers = true
    checkedRoutes = true
    checkedDrivers = true
    checkedPorts = true
    mustRefresh = true
    indeterminateDestinations: boolean
    indeterminateCustomers: boolean
    indeterminateRoutes: boolean
    indeterminateDrivers: boolean
    indeterminatePorts: boolean
    activePanel: string

    //#endregion

    //#region table

    headers = ['S', 'Id', 'Destination', 'Destination abbreviation', 'Route', 'Customer', 'Pickup point', 'Time', 'A', 'K', 'F', 'T', 'Driver', 'Port', '']
    widths = ['40px', '100px', '200px', '0px', '100px', '200px', '200px', '40px', '40px', '40px', '40px', '40px', '200px', '100px', '56px']
    visibility = ['', 'none', '', 'none']
    justify = ['center', 'center', 'left', 'left', 'left', 'left', 'left', 'right', 'right', 'right', 'right', 'right', 'left', 'left', 'center']
    fields = ['', 'id', 'destination', 'destinationAbbreviation', 'route', 'customer', 'pickupPoint', 'time', 'adults', 'kids', 'free', 'totalPersons', 'driver', 'port', '']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private interactionService: InteractionService, private service: TransferService, private pdfService: TransferPdfService, private driverService: DriverService, private location: Location, private snackbarService: SnackbarService, public dialog: MatDialog, private transferService: TransferService, private helperService: HelperService, private messageSnackbarService: MessageSnackbarService, private keyboardShortcutsService: KeyboardShortcuts, private messageLabelService: MessageLabelService, private buttonClickService: ButtonClickService, private titleService: Title) {
        this.activatedRoute.params.subscribe((params: Params) => this.dateIn = params['dateIn'])
        this.router.events.subscribe((navigation) => {
            if (navigation instanceof NavigationEnd && this.dateIn !== '' && this.router.url.split('/').length === 4) {
                this.mustRefresh = true
                this.loadRecords()
            }
        })
    }

    //#region lifecycle hooks

    ngOnInit() {
        this.setWindowTitle()
        this.addShortcuts()
        this.initPersonsSumArray()
        this.subscribeToInteractionService()
        this.onFocusSummaryPanel()
    }

    ngAfterViewInit() {
        if (this.isDataInLocalStorage()) {
            this.updateSelectedArraysFromLocalStorage()
        } else {
            this.updateSelectedArraysFromInitialResults()
            this.saveSelectedItemsToLocalStorage()
        }
        this.addActiveClassToSummaryItems()
        this.filterByCriteria()
        this.initCheckedPersons()
        this.updateTotals()
        this.updateParentCheckboxes()
    }

    ngDoCheck() {
        if (this.mustRefresh) {
            this.mustRefresh = false
            this.ngAfterViewInit()
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion

    //#region public methods
    
    public onAssignDriver() {
        if (this.isAnyRowSelected()) {
            const dialogRef = this.dialog.open(TransferAssignDriverComponent, {
                height: '350px',
                width: '550px',
                data: {
                    title: 'Assign driver',
                    drivers: this.driverService.getAllActive(),
                    actions: ['abort', 'ok']
                },
                panelClass: 'dialog'
            })
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    this.transferService.assignDriver(result, this.records).subscribe(() => {
                        this.removeSelectedIdsFromLocalStorage()
                        this.navigateToList()
                        this.showSnackbar(this.messageSnackbarService.selectedRecordsHaveBeenProcessed(), 'info')
                    })
                }
            })
        }
    }

    public onCreatePdf() {
        this.pdfService.createReport(this.transfersFlat, this.getDriversFromLocalStorage(), this.dateIn)
    }

    public onGetLabel(id: string) {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack() {
        this.router.navigate(['/'])
    }

    public onNew() {
        this.driverService.getDefaultDriver().subscribe(() => {
            document.getElementById('listTab').click()
            this.router.navigate([this.location.path() + '/transfer/new']) // OK
        }, () => {
            this.showSnackbar(this.messageSnackbarService.noDefaultDriverFound(), 'error')
        })
    }

    public onToggleItem(item: any, lookupArray: string[], checkedVariable: any, indeterminate: any, className: string) {
        this.toggleActiveItem(item, lookupArray)
        this.initCheckedPersons()
        this.filterByCriteria()
        this.updateTotals()
        this.saveSelectedItemsToLocalStorage()
        this.updateParentCheckBox(className, indeterminate, checkedVariable)
    }

    public onToggleParentCheckbox(className: string, lookupArray: any[], checkedArray: any) {
        event.stopPropagation()
        lookupArray.splice(0)
        this.selectItems(className, lookupArray, !checkedArray)
        this.filterByCriteria()
        this.initCheckedPersons()
        this.saveSelectedItemsToLocalStorage()
        this.updateTotals()
    }

    //#endregion

    //#region private methods

    private addActiveClassToElements(className: string, lookupArray: string[]) {
        const elements = document.querySelectorAll(className)
        elements.forEach((element) => {
            const position = lookupArray.indexOf(element.id)
            if (position >= 0) {
                element.classList.add('activeItem')
            }
        })
    }

    private addActiveClassToSummaryItems() {
        setTimeout(() => {
            this.addActiveClassToElements('.item.destination', this.selectedDestinations)
            this.addActiveClassToElements('.item.customer', this.selectedCustomers)
            this.addActiveClassToElements('.item.route', this.selectedRoutes)
            this.addActiveClassToElements('.item.driver', this.selectedDrivers)
            this.addActiveClassToElements('.item.port', this.selectedPorts)
        }, 100)
    }

    private addShortcuts() {
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

    private editRecord(id: number) {
        this.router.navigate(['transfer/', id], { relativeTo: this.activatedRoute })
    }

    private filterByCriteria() {
        this.queryResultClone.transfers = this.queryResult.transfers
            .filter((destination: { destination: { description: string } }) => this.selectedDestinations.indexOf(destination.destination.description) !== -1)
            .filter((customer: { customer: { description: string } }) => this.selectedCustomers.indexOf(customer.customer.description) !== -1)
            .filter((route: { pickupPoint: { route: { description: string } } }) => this.selectedRoutes.indexOf(route.pickupPoint.route.description) !== -1)
            .filter((driver: { driver: { description: string } }) => this.selectedDrivers.indexOf(driver.driver.description) !== -1)
            .filter((port: { pickupPoint: { route: { port: { description: string } } } }) => this.selectedPorts.indexOf(port.pickupPoint.route.port.description) !== -1)
    }

    private flattenResults() {
        this.transfersFlat.splice(0)
        for (const {
            id: a,
            destination: { description: b, abbreviation: c },
            customer: { description: d },
            adults: e,
            kids: f,
            free: g,
            totalPersons: h,
            pickupPoint: { description: i, time: j, route: { description: k, port: { description: l } } },
            driver: { description: m },
            dateIn: n,
            remarks: o
        } of this.queryResultClone.transfers) {
            this.transfersFlat.push({ id: a, destination: b, destinationAbbreviation: c, customer: d, adults: e, kids: f, free: g, totalPersons: h, pickupPoint: i, time: j, route: k, port: l, driver: m, dateIn: n, remarks: o })
        }
    }

    public onFocusListPanel() {
        this.activePanel = 'list'
        document.getElementById('summaryTab').classList.remove('active')
        document.getElementById('listTab').classList.add('active')
        this.flattenResults()
    }

    public onFocusSummaryPanel() {
        this.activePanel = 'summary'
        document.getElementById('summaryTab').classList.add('active')
        document.getElementById('listTab').classList.remove('active')
    }

    private getDriversFromLocalStorage() {
        const localStorageData = JSON.parse(localStorage.getItem('transfers'))
        return JSON.parse(localStorageData.drivers)
    }

    private initCheckedPersons() {
        this.interactionService.setCheckedTotalPersons(0)
    }

    private initPersonsSumArray() {
        this.totals.push(
            { description: this.onGetLabel('total'), sum: 0 },
            { description: this.onGetLabel('displayed'), sum: 0 },
            { description: this.onGetLabel('selected'), sum: 0 }
        )
    }

    private isDataInLocalStorage() {
        return localStorage.getItem('transfers')
    }

    private isAnyRowSelected() {
        if (this.totals[2].sum === 0) {
            this.showSnackbar(this.messageSnackbarService.noRecordsSelected(), 'error')
            return false
        }
        this.records = JSON.parse(localStorage.getItem('selectedIds'))
        return true
    }

    private loadRecords() {
        const transferListResolved = this.activatedRoute.snapshot.data[this.resolver]
        if (transferListResolved.error === null) {
            this.queryResult = transferListResolved.result
        } else {
            this.showSnackbar(this.messageSnackbarService.noContactWithServer(), 'error')
        }
    }

    private navigateToList() {
        this.router.navigate(['transfers/date/', this.helperService.getDateFromLocalStorage()])
    }

    private removeSelectedIdsFromLocalStorage() {
        localStorage.removeItem('selectedIds')
    }

    private saveSelectedItemsToLocalStorage() {
        const summaryItems = {
            'destinations': JSON.stringify(this.selectedDestinations),
            'customers': JSON.stringify(this.selectedCustomers),
            'routes': JSON.stringify(this.selectedRoutes),
            'drivers': JSON.stringify(this.selectedDrivers),
            'ports': JSON.stringify(this.selectedPorts),
        }
        localStorage.setItem('transfers', JSON.stringify(summaryItems))
        localStorage.removeItem('selectedIds')
    }

    private selectItems(className: string, lookupArray: string[], checked: boolean) {
        const elements = document.getElementsByClassName('item ' + className)
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index]
            if (checked) {
                element.classList.add('activeItem')
                lookupArray.push(element.id)
            } else {
                element.classList.remove('activeItem')
            }
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
        this.interactionService.refreshList.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.service.getTransfers(this.dateIn).subscribe(result => {
                this.queryResult = result
                this.ngAfterViewInit()
            })
        })
        this.interactionService.tableRow.subscribe(result => {
            this.transfersFlat.splice(Number(result), 1)
            this.updateTotals()
        })

    }

    private toggleActiveItem(item: { description: string }, lookupArray: string[]) {
        const element = document.getElementById(item.description)
        if (element.classList.contains('activeItem')) {
            for (let i = 0; i < lookupArray.length; i++) {
                if ((lookupArray)[i] === item.description) {
                    lookupArray.splice(i, 1)
                    i--
                    element.classList.remove('activeItem')
                    break
                }
            }
        } else {
            element.classList.add('activeItem')
            lookupArray.push(item.description)
        }
    }

    private updateSelectedArraysFromInitialResults() {
        this.queryResult.personsPerDestination.forEach((element: { description: string }) => { this.selectedDestinations.push(element.description) })
        this.queryResult.personsPerCustomer.forEach((element: { description: string }) => { this.selectedCustomers.push(element.description) })
        this.queryResult.personsPerRoute.forEach((element: { description: string }) => { this.selectedRoutes.push(element.description) })
        this.queryResult.personsPerDriver.forEach((element: { description: string }) => { this.selectedDrivers.push(element.description) })
        this.queryResult.personsPerPort.forEach((element: { description: string }) => { this.selectedPorts.push(element.description) })
    }

    private updateSelectedArraysFromLocalStorage() {
        const localStorageData = JSON.parse(localStorage.getItem('transfers'))
        this.selectedDestinations = JSON.parse(localStorageData.destinations)
        this.selectedCustomers = JSON.parse(localStorageData.customers)
        this.selectedRoutes = JSON.parse(localStorageData.routes)
        this.selectedDrivers = JSON.parse(localStorageData.drivers)
        this.selectedPorts = JSON.parse(localStorageData.ports)
    }

    private updateTotals() {
        this.totals[0].sum = this.queryResult.persons
        this.totals[1].sum = this.queryResultClone.transfers.reduce((sum: number, array: { totalPersons: number }) => sum + array.totalPersons, 0)
        this.interactionService.checked.pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
            this.totals[2].sum = result
        })
    }

    private updateParentCheckboxes() {
        setTimeout(() => {
            this.updateParentCheckBox('destination', 'indeterminateDestinations', 'checkedDestinations')
            this.updateParentCheckBox('customer', 'indeterminateCustomers', 'checkedCustomers')
            this.updateParentCheckBox('route', 'indeterminateRoutes', 'checkedRoutes')
            this.updateParentCheckBox('driver', 'indeterminateDrivers', 'checkedDrivers')
            this.updateParentCheckBox('port', 'indeterminatePorts', 'checkedPorts')
        }, 100)
    }

    private updateParentCheckBox(summary: string, indeterminateVariable: string, checkedVariable: string) {
        const allItems = document.querySelectorAll('.item.' + summary).length
        const activeItems = document.querySelectorAll('.item.' + summary + '.activeItem').length
        this[indeterminateVariable] = activeItems == allItems || activeItems == 0 ? false : true
        this[checkedVariable] = activeItems == 0 || (activeItems < allItems && activeItems != 0) ? false : true
    }

    //#endregion

}
