import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subject } from 'rxjs'
import { CustomerService } from 'src/app/customers/classes/customer.service'
import { DestinationService } from 'src/app/destinations/classes/destination.service'
import { Driver } from 'src/app/drivers/classes/driver'
import { DriverService } from 'src/app/drivers/classes/driver.service'
import { PickupPointService } from 'src/app/pickupPoints/classes/pickupPoint.service'
import { PortService } from 'src/app/ports/classes/port.service'
import { DialogIndexComponent } from 'src/app/shared/components/dialog-index/dialog-index.component'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Transfer } from '../classes/transfer'
import { TransferService } from '../classes/transfer.service'
import { PickupPointFlat } from '../../pickupPoints/classes/pickupPoint-flat'
import { environment } from 'src/environments/environment'
import { slideFromRight, slideFromLeft } from 'src/app/shared/animations/animations'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'

@Component({
    selector: 'transfer-form',
    templateUrl: './transfer-form.component.html',
    styleUrls: ['./transfer-form.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class TransferFormComponent implements OnInit, OnDestroy {

    //#region variables

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    windowTitle = 'Transfer'
    environment: boolean = environment.production
    feature = 'transferForm'

    //#endregion

    //#region particular variables

    defaultDriver: any
    customers: any
    destinations: any
    drivers: any
    pickupPoints: any
    pickupPointsFlat: PickupPointFlat[]
    ports: any

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute,
        private buttonClickService: ButtonClickService,
        private customerService: CustomerService,
        private destinationService: DestinationService,
        private dialogService: DialogService,
        private driverService: DriverService,
        private formBuilder: FormBuilder,
        private helperService: HelperService,
        private messageHintService: MessageHintService,
        private interactionService: InteractionService,
        private keyboardShortcutsService: KeyboardShortcuts,
        public dialog: MatDialog,
        private messageLabelService: MessageLabelService,
        private messageSnackbarService: MessageSnackbarService,
        private pickupPointService: PickupPointService,
        private portService: PortService,
        private router: Router,
        private snackbarService: SnackbarService,
        private transferService: TransferService,
        private titleService: Title) {
        this.activatedRoute.params.subscribe(p => {
            if (p.id) {
                this.getRecord(p.id)
            } else {
                this.driverService.getDefaultDriver().subscribe(result => {
                    this.defaultDriver = result
                    this.populateFormWithDefaultValues(this.defaultDriver)
                    this.showModalForm()
                    this.focus('destinationDescription')
                }, () => {
                    this.showSnackbar(this.messageSnackbarService.noDefaultDriverFound(), 'error')
                })
            }
        })
    }

    //#region lifecycle hooks

    ngOnInit() {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.populateDropDowns()
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    canDeactivate() {
        if (this.form.dirty) {
            this.dialogService.open('warningColor', this.messageSnackbarService.askConfirmationToAbortEditing(), ['abort', 'ok']).subscribe(response => {
                if (response) {
                    this.resetForm()
                    this.onGoBack()
                    return true
                }
            })
        } else {
            this.hideModalForm()
            return true
        }
    }

    //#endregion

    //#region public methods

    public onCalculateTotalPersons() {
        const totalPersons = parseInt(this.form.value.adults, 10) + parseInt(this.form.value.kids, 10) + parseInt(this.form.value.free, 10)
        this.form.patchValue({ totalPersons: Number(totalPersons) ? totalPersons : 0 })
    }

    public onDelete() {
        this.dialogService.open('warningColor', this.messageSnackbarService.askConfirmationToDelete(), ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.transferService.delete(this.form.value.id).subscribe(() => {
                    this.showSnackbar(this.messageSnackbarService.recordDeleted(), 'info')
                    this.onGoBack()
                    this.interactionService.removeTableRow(this.getRowIndex(this.form.value.id))
                    this.resetForm()
                }, errorCode => {
                    this.showSnackbar(this.messageSnackbarService.getHttpErrorMessage(errorCode), 'error')
                })
            }
        })
    }

    public onGetHint(id: string, minmax = 0) {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onGetLabel(id: string) {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack() {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
    }

    public onLookupIndex(lookupArray: any[], title: string, formFields: any[], fields: any[], headers: any[], widths: any[], visibility: any[], justify: any[], value: { target: { value: any } }) {
        const filteredArray = []
        lookupArray.filter(x => {
            const key = fields[1]
            if (x[key].toUpperCase().includes(value.target.value.toUpperCase())) {
                filteredArray.push(x)
            }
        })
        if (filteredArray.length === 0) {
            this.clearFields(null, formFields[0], formFields[1])
        }
        if (filteredArray.length === 1) {
            const [...elements] = filteredArray
            this.patchFields(elements[0], fields)
        }
        if (filteredArray.length > 1) {
            this.showModalIndex(filteredArray, title, fields, headers, widths, visibility, justify)
        }
    }

    public onSave() {
        if (this.form.value.id === 0 || this.form.value.id === null) {
            this.transferService.add(this.form.value).subscribe(() => {
                this.initForm()
                this.populateFormWithDefaultValues(this.defaultDriver)
                this.refreshSummary()
                this.focus('destinationDescription')
                this.showSnackbar(this.messageSnackbarService.recordCreated(), 'info')
            }, errorCode => {
                this.showSnackbar(this.messageSnackbarService.getHttpErrorMessage(errorCode), 'error')
            })
        } else {
            this.transferService.update(this.form.value.id, this.form.value).subscribe(() => {
                this.resetForm()
                this.showSnackbar(this.messageSnackbarService.recordUpdated(), 'info')
                this.onGoBack()
            }, errorCode => {
                this.showSnackbar(this.messageSnackbarService.getHttpErrorMessage(errorCode), 'error')
            })
        }
    }


    //#endregion

    //#region private methods

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': () => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.onGoBack()
                }
            },
            'Alt.D': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'delete')
            },
            'Alt.S': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'save')
                }
            },
            'Alt.C': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'abort')
                }
            },
            'Alt.O': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'ok')
                }
            }
        }, {
            priority: 3,
            inputs: true
        })
    }

    private clearFields(result: any, id: any, description: any) {
        this.form.patchValue({ [id]: result ? result.id : '' })
        this.form.patchValue({ [description]: result ? result.description : '' })
    }

    private flattenPickupPoints(): any[] {
        this.pickupPointsFlat = []
        for (const {
            id: a,
            description: b,
            exactPoint: c,
            time: d,
            route: { port: { id: e } }
        } of this.pickupPoints) {
            this.pickupPointsFlat.push({ pickupPointId: a, pickupPointDescription: b, exactPoint: c, time: d, portId: e })
        }
        return this.pickupPointsFlat
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private getRecord(id: number) {
        this.transferService.getSingle(id).subscribe(result => {
            this.showModalForm()
            this.populateFields(result)
            this.focus('destinationDescription')
        }, errorCode => {
            this.showSnackbar(this.messageSnackbarService.getHttpErrorMessage(errorCode), 'error')
            this.onGoBack()
        })
    }

    private getRowIndex(recordId: string) {
        const table = <HTMLTableElement>document.querySelector('table')
        for (let i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[1].innerText == recordId) {
                return i - 1
            }
        }
    }

    private hideModalForm() {
        document.getElementById('transferFormModal').style.visibility = "hidden"
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: 0,
            dateIn: '',
            destinationId: [0, Validators.required], destinationDescription: ['', Validators.required],
            customerId: [0, Validators.required], customerDescription: ['', Validators.required],
            pickupPointId: [0, Validators.required], pickupPointDescription: ['', Validators.required],
            adults: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            kids: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            free: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            totalPersons: [0, { disabled: true }],
            driverId: [0, Validators.required], driverDescription: [{ value: '', disabled: true }, Validators.required],
            portId: [0, Validators.required], portDescription: [{ value: '', disabled: true }],
            remarks: ['', Validators.maxLength(128)],
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private patchFields(result: any, fields: any[]) {
        if (result) {
            Object.entries(result).forEach(([key, value]) => {
                this.form.patchValue({ [key]: value })
            })
        } else {
            fields.forEach(field => {
                this.form.patchValue({ [field]: '' })
            })
        }
    }

    private populateDropDowns() {
        const sources = []
        sources.push(this.customerService.getAllActive())
        sources.push(this.destinationService.getAllActive())
        sources.push(this.driverService.getAllActive())
        sources.push(this.pickupPointService.getAllActive())
        sources.push(this.portService.getAllActive())
        return forkJoin(sources).subscribe(
            result => {
                this.customers = result[0]
                this.destinations = result[1]
                this.drivers = result[2]
                this.pickupPoints = result[3]
                this.pickupPointsFlat = this.flattenPickupPoints()
                this.ports = result[4]
                this.renameObjects()
            })
    }

    private populateFields(result: Transfer) {
        this.form.setValue({
            id: result.id,
            dateIn: result.dateIn,
            destinationId: result.destination.id, destinationDescription: result.destination.description,
            customerId: result.customer.id, customerDescription: result.customer.description,
            pickupPointId: result.pickupPoint.id, pickupPointDescription: result.pickupPoint.description,
            driverId: result.driver.id, driverDescription: result.driver.description,
            portId: result.pickupPoint.route.port.id, portDescription: result.pickupPoint.route.port.description,
            adults: result.adults,
            kids: result.kids,
            free: result.free,
            totalPersons: result.totalPersons,
            remarks: result.remarks,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private populateFormWithDefaultValues(driver: Driver) {
        this.form.patchValue({
            id: 0,
            dateIn: this.helperService.getDateFromLocalStorage(),
            destinationId: 0, destinationDescription: '',
            customerId: 0, customerDescription: '',
            pickupPointId: 0, pickupPointDescription: '',
            adults: 0,
            kids: 0,
            free: 0,
            totalPersons: 0,
            driverId: driver.id, driverDescription: driver.description,
            portId: 0, portDescription: '',
            remarks: '',
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private refreshSummary() {
        this.interactionService.mustRefreshList()
    }

    private renameKey(obj: any, oldKey: string, newKey: string) {
        if (oldKey !== newKey) {
            Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey))
            delete obj[oldKey]
        }
    }

    private renameObjects() {
        this.destinations.forEach(obj => {
            this.renameKey(obj, 'id', 'destinationId')
            this.renameKey(obj, 'description', 'destinationDescription')
            this.renameKey(obj, 'isActive', 'destinationIsActive')
            this.renameKey(obj, 'userId', 'destinationUserId')
        })
        this.customers.forEach(obj => {
            this.renameKey(obj, 'id', 'customerId')
            this.renameKey(obj, 'description', 'customerDescription')
            this.renameKey(obj, 'isActive', 'customerIsActive')
            this.renameKey(obj, 'userId', 'customerUserId')
        })
        this.drivers.forEach(obj => {
            this.renameKey(obj, 'id', 'driverId')
            this.renameKey(obj, 'description', 'driverDescription')
            this.renameKey(obj, 'isActive', 'driverIsActive')
            this.renameKey(obj, 'userId', 'driverUserId')
        })
        this.ports.forEach(obj => {
            this.renameKey(obj, 'id', 'portId')
            this.renameKey(obj, 'description', 'portDescription')
            this.renameKey(obj, 'isActive', 'portIsActive')
            this.renameKey(obj, 'userId', 'portUserId')
        })
    }

    private resetForm() {
        this.form.reset()
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showModalForm() {
        document.getElementById('transferFormModal').style.visibility = "visible"
    }

    private showModalIndex(elements: any, title: string, fields: any[], headers: any[], widths: any[], visibility: any[], justify: any[]) {
        const dialog = this.dialog.open(DialogIndexComponent, {
            height: '685px',
            data: {
                records: elements,
                title: title,
                fields: fields,
                headers: headers,
                widths: widths,
                visibility: visibility,
                justify: justify
            }
        })
        dialog.afterClosed().subscribe((result) => {
            this.patchFields(result, fields)
        })
    }

    private showSnackbar(message: string, type: string) {
        this.snackbarService.open(message, type)
    }

    //#endregion

    //#region getters

    get destinationId() {
        return this.form.get('destinationId')
    }

    get destinationDescription() {
        return this.form.get('destinationDescription')
    }

    get customerId() {
        return this.form.get('customerId')
    }

    get customerDescription() {
        return this.form.get('customerDescription')
    }

    get pickupPointId() {
        return this.form.get('pickupPointId')
    }

    get pickupPointDescription() {
        return this.form.get('pickupPointDescription')
    }

    get adults() {
        return this.form.get('adults')
    }

    get kids() {
        return this.form.get('kids')
    }

    get free() {
        return this.form.get('free')
    }

    get totalPersons() {
        return this.form.get('totalPersons')
    }

    get driverId() {
        return this.form.get('driverId')
    }

    get driverDescription() {
        return this.form.get('driverDescription')
    }

    get portId() {
        return this.form.get('portId')
    }

    get portDescription() {
        return this.form.get('portDescription')
    }

    get remarks() {
        return this.form.get('remarks')
    }

    //#endregion

}
