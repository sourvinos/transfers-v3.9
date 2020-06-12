import { Location } from '@angular/common'
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core'
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
import { MessageService } from 'src/app/shared/services/message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { TransferFlat } from '../classes/transfer-flat'
import { TransferPdfService } from '../classes/transfer-pdf.service'
import { TransferService } from '../classes/transfer.service'
import { TransferViewModel } from './../classes/transferViewModel'
import { TransferAssignDriverComponent } from './transfer-assign-driver'

@Component({
    selector: 'transfer-list',
    templateUrl: './transfer-list.html',
    styleUrls: ['./transfer-list.css']
})


export class TransferListComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnDestroy {

    //#region 

    ngUnsubscribe = new Subject<void>()
    records: string[] = []
    resolver = 'transferList'
    unlisten: Unlisten
    windowTitle = 'Transfers'

    //#endregion

    //#region 

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

    //#endregion

    //#region

    headers = ['S', 'Id', 'Destination', 'Destination abbreviation', 'Route', 'Customer', 'Pickup point', 'Time', 'A', 'K', 'F', 'T', 'Driver', 'Port']
    widths = ['40px', '100px', '200px', '0px', '100px', '200px', '200px', '40px', '40px', '40px', '40px', '40px', '200px', '100px']
    visibility = ['', 'none', '', 'none', '', '', '', '', '', '', '', '', '', '']
    justify = ['center', 'center', 'left', 'left', 'left', 'left', 'left', 'right', 'right', 'right', 'right', 'right', 'left', 'left']
    fields = ['', 'id', 'destination', 'destinationAbbreviation', 'route', 'customer', 'pickupPoint', 'time', 'adults', 'kids', 'free', 'totalPersons', 'driver', 'port']

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private interactionService: InteractionService, private service: TransferService, private pdfService: TransferPdfService, private driverService: DriverService, private location: Location, private snackbarService: SnackbarService, public dialog: MatDialog, private transferService: TransferService, private helperService: HelperService, private messageService: MessageService, private keyboardShortcutsService: KeyboardShortcuts, private buttonClickService: ButtonClickService, private titleService: Title) {
        this.activatedRoute.params.subscribe((params: Params) => this.dateIn = params['dateIn'])
        this.router.events.subscribe((navigation) => {
            if (navigation instanceof NavigationEnd && this.dateIn !== '' && this.router.url.split('/').length === 4) {
                this.mustRefresh = true
                this.loadRecords()
            }
        })
    }

    ngOnInit(): void {
        this.addShortcuts()
        this.initPersonsSumArray()
        this.subscribeToInteractionService()
    }

    ngAfterViewInit(): void {
        this.setWindowTitle()
        if (this.queryResult.transfers.length !== 0) {
            if (this.isDataInLocalStorage()) {
                this.updateSelectedArraysFromLocalStorage()
            } else {
                this.updateSelectedArraysFromInitialResults()
                this.saveArraysToLocalStorage()
            }
            this.addActiveClassToSelectedArrays()
            this.filterByCriteria()
            this.initCheckedPersons()
            this.updateTotals()
            this.flattenResults()
        }
    }

    ngAfterViewChecked(): void {
        document.getElementById('summaries').style.height = document.getElementById('listFormCombo').offsetHeight - 125 + 'px'
    }

    ngDoCheck(): void {
        if (this.mustRefresh) {
            this.mustRefresh = false
            this.ngAfterViewInit()
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    public onAssignDriver(): void {
        if (this.isRecordSelected()) {
            const dialogRef = this.dialog.open(TransferAssignDriverComponent, {
                height: '350px',
                width: '550px',
                data: {
                    title: 'Assign driver',
                    drivers: this.driverService.getAllActive(),
                    actions: ['cancel', 'ok']
                },
                panelClass: 'dialog'
            })
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    this.transferService.assignDriver(result, this.records).subscribe(() => {
                        this.removeSelectedIdsFromLocalStorage()
                        this.navigateToList()
                        this.showSnackbar(this.messageService.recordsHaveBeenProcessed(), 'info')
                    })
                }
            })
        }
    }

    public onCreatePdf(): void {
        this.pdfService.createReport(this.transfersFlat, this.getDriversFromLocalStorage(), this.dateIn)
    }

    public onNew(): void {
        this.driverService.getDefaultDriver().subscribe(() => {
            this.router.navigate([this.location.path() + '/transfer/new']) // OK
        }, () => {
            this.showSnackbar(this.messageService.noDefaultDriverFound(), 'error')
        })
    }

    public onToggleItem(item: any, lookupArray: string[], checkedVariable: any, className: string): void {
        this.toggleActiveItem(item, lookupArray)
        this.initCheckedPersons()
        this.filterByCriteria()
        this.updateTotals()
        this.flattenResults()
        this.saveArraysToLocalStorage()
        this.checkToToggleHeaderCheckbox(lookupArray, checkedVariable, className)
    }

    public onToggleItems(className: string, lookupArray: any[], checkedArray: any) {
        event.stopPropagation()
        lookupArray.splice(0)
        this.selectItems(className, lookupArray, !checkedArray)
        this.filterByCriteria()
        this.initCheckedPersons()
        this.saveArraysToLocalStorage()
        this.updateTotals()
        this.flattenResults()
    }

    private addActiveClassToElements(className: string, lookupArray: string[]) {
        const elements = document.querySelectorAll(className)
        elements.forEach((element) => {
            const position = lookupArray.indexOf(element.id)
            if (position >= 0) {
                element.classList.add('activeItem')
            }
        })
    }

    private addActiveClassToSelectedArrays() {
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
        }, {
            priority: 2,
            inputs: true
        })
    }

    private checkToToggleHeaderCheckbox(lookupArray: string[], checkedVariable: any, className: string) {
        if (lookupArray.length === 0) {
            this[checkedVariable] = false
        }
        if (lookupArray.length === document.getElementsByClassName('item ' + className).length) {
            this[checkedVariable] = true
        }
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
            userId: n,
            dateIn: o,
            remarks: p
        } of this.queryResultClone.transfers) {
            this.transfersFlat.push({ id: a, destination: b, destinationAbbreviation: c, customer: d, adults: e, kids: f, free: g, totalPersons: h, pickupPoint: i, time: j, route: k, port: l, driver: m, userId: n, dateIn: o, remarks: p })
        }
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
            { description: 'ALL', sum: 0 },
            { description: 'DISPLAYED', sum: 0 },
            { description: 'CHECKED', sum: 0 }
        )
    }

    private isDataInLocalStorage() {
        return localStorage.getItem('transfers')
    }

    private isRecordSelected() {
        if (this.totals[2].sum === 0) {
            this.showSnackbar(this.messageService.noRecordsSelected(), 'error')
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
            this.showSnackbar(this.messageService.noContactWithApi(), 'error')
        }
    }

    private navigateToList() {
        this.router.navigate(['transfers/dateIn/', this.helperService.getDateFromLocalStorage()])
    }

    public onGoBack(): void {
        this.router.navigate(['/'])
    }

    private removeSelectedIdsFromLocalStorage() {
        localStorage.removeItem('selectedIds')
    }

    private saveArraysToLocalStorage() {
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

}
