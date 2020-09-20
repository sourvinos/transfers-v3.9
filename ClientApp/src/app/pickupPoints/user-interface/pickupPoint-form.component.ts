import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subject } from 'rxjs'
import { RouteService } from 'src/app/routes/classes/route.service'
import { DialogIndexComponent } from 'src/app/shared/components/dialog-index/dialog-index.component'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { SnackbarMessageService } from 'src/app/shared/services/snackbar-message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { DialogService } from '../../shared/services/dialog.service'
import { PickupPoint } from '../classes/pickupPoint'
import { PickupPointService } from '../classes/pickupPoint.service'
import { environment } from 'src/environments/environment'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'

@Component({
    selector: 'pickuppoint-form',
    templateUrl: './pickupPoint-form.component.html',
    styleUrls: ['../../../assets/styles/forms.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class PickupPointFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region 

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '../../'
    windowTitle = 'Pickup point'
    environment: boolean = environment.production

    //#endregion

    //#region 
    routeId: number
    routes: any

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: SnackbarMessageService, private pickupPointService: PickupPointService, private routeService: RouteService, private router: Router, private snackbarService: SnackbarService, public dialog: MatDialog, private titleService: Title) {
        this.activatedRoute.params.subscribe(p => {
            if (p.pickupPointId) {
                this.getRecord(p.pickupPointId)
            } else {
                this.routeId = parseInt(this.router.url.split('/')[3], 10)
                this.patchRouteFields()
            }
        })
    }

    ngOnInit() {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.populateDropDowns()
    }

    ngAfterViewInit() {
        this.focus('description')
    }

    ngOnDestroy() {
        this.unsubscribe()
        this.unlisten()
    }

    canDeactivate() {
        if (this.form.dirty) {
            this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToAbortEditing(), ['abort', 'ok']).subscribe(response => {
                if (response) {
                    this.resetForm()
                    this.onGoBack()
                    return true
                }
            })
        } else {
            return true
        }
    }

    public onDelete() {
        this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToDelete(), ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.pickupPointService.delete(this.form.value.id).subscribe(() => {
                    this.resetForm()
                    this.showSnackbar(this.messageService.recordDeleted(), 'info')
                    this.onGoBack()
                }, error => {
                    this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
                })
            }
        })
    }

    public onGoBack() {
        this.router.navigate([this.url], { relativeTo: this.activatedRoute })
    }

    public onLookupIndex(lookupArray: any[], title: string, formFields: any[], fields: any[], headers: any[], widths: any[], visibility: any[], justify: any[], value: { target: { value: any } }) {
        const filteredArray = []
        lookupArray.filter(x => {
            const key = fields[1]
            if (x[key].toUpperCase().includes(value.target.value.toUpperCase())) {
                filteredArray.push(x)
            }
        })
        if (filteredArray.length > 0) {
            this.showModalIndex(filteredArray, title, fields, headers, widths, visibility, justify)
        }
        if (filteredArray.length === 0) {
            this.clearFields(null, formFields[0], formFields[1])
            this.focus(formFields[1])
        }
    }

    public onSave() {
        if (this.form.value.id === 0 || this.form.value.id === null) {
            this.pickupPointService.add(this.form.value).subscribe(() => {
                this.focus('description')
                this.initFormAfterDelay()
                this.showSnackbar(this.messageService.recordCreated(), 'info')
            }, error => {
                this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            })
        } else {
            this.pickupPointService.update(this.form.value.id, this.form.value).subscribe(() => {
                this.showSnackbar(this.messageService.recordUpdated(), 'info')
                this.resetForm()
                this.onGoBack()
            }, error => {
                this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            })
        }
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'goBack')
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
            priority: 0,
            inputs: true
        })
    }

    private clearFields(result: any, id: any, description: any) {
        this.form.patchValue({ [id]: result ? result.id : '' })
        this.form.patchValue({ [description]: result ? result.description : '' })
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private getRecord(id: number) {
        this.pickupPointService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        }, error => {
            this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            this.onGoBack()
        })
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: 0,
            routeId: [0, Validators.required], routeDescription: [{ value: '', disabled: true }, Validators.required],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            exactPoint: ['', [Validators.required, Validators.maxLength(128)]],
            time: ['', [Validators.required, Validators.pattern('[0-9][0-9]:[0-9][0-9]')]],
            isActive: true,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private initFormAfterDelay() {
        setTimeout(() => {
            this.initForm()
        }, 200)
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

    private patchRouteFields() {
        setTimeout(() => {
            const route: any[] = this.routes.filter(x => x.routeId === this.routeId)
            this.form.patchValue({
                routeId: this.routeId,
                routeDescription: route[0].routeDescription
            })
        }, 500)
    }

    private populateDropDowns() {
        const sources = []
        sources.push(this.routeService.getAllActive())
        return forkJoin(sources).subscribe(
            result => {
                this.routes = result[0]
                this.renameObjects()
            }
        )
    }

    private populateFields(result: PickupPoint) {
        this.form.setValue({
            id: result.id,
            routeId: result.route.id, routeDescription: result.route.description,
            description: result.description,
            exactPoint: result.exactPoint,
            time: result.time,
            isActive: result.isActive,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private renameKey(obj: unknown, oldKey: string, newKey: string) {
        if (oldKey !== newKey) {
            Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey))
            delete obj[oldKey]
        }
    }

    private renameObjects() {
        this.routes.forEach((obj: any) => {
            this.renameKey(obj, 'id', 'routeId')
            this.renameKey(obj, 'description', 'routeDescription')
            this.renameKey(obj, 'isActive', 'routeIsActive')
            this.renameKey(obj, 'userId', 'routeUserId')
        })
    }

    private resetForm() {
        this.form.reset()
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
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

    private unsubscribe() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    //#region Getters

    get routeDescription() {
        return this.form.get('routeDescription')
    }

    get description() {
        return this.form.get('description')
    }

    get exactPoint() {
        return this.form.get('exactPoint')
    }

    get time() {
        return this.form.get('time')
    }

    //#endregion

}
