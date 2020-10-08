import { ValidationService } from './../../shared/services/validation.service'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subject, Subscription } from 'rxjs'
import { RouteService } from 'src/app/routes/classes/route.service'
import { DialogIndexComponent } from 'src/app/shared/components/dialog-index/dialog-index.component'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { DialogService } from '../../shared/services/dialog.service'
import { PickupPoint } from '../classes/pickupPoint'
import { PickupPointService } from '../classes/pickupPoint.service'
import { environment } from 'src/environments/environment'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'

@Component({
    selector: 'pickuppoint-form',
    templateUrl: './pickupPoint-form.component.html',
    styleUrls: ['../../../assets/styles/forms.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class PickupPointFormComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private url = '../../'
    private windowTitle = 'Pickup point'
    public environment = environment.production
    public feature = 'pickupPointForm'
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    //#region particular variables

    routeId: number
    routes: any

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private messageService: MessageSnackbarService, private pickupPointService: PickupPointService, private routeService: RouteService, private router: Router, private snackbarService: SnackbarService, private titleService: Title, public dialog: MatDialog) {
        this.activatedRoute.params.subscribe(p => {
            if (p.pickupPointId) {
                this.getRecord(p.pickupPointId)
            } else {
                this.routeId = parseInt(this.router.url.split('/')[3], 10)
                this.patchRouteFields()
            }
        })
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
        this.populateDropDowns()
    }

    ngAfterViewInit(): void {
        this.focus('description')
    }

    ngOnDestroy(): void {
        this.unsubscribe()
        this.unlisten()
    }

    canDeactivate(): boolean {
        if (this.form.dirty) {
            this.dialogService.open('warningColor', this.messageService.askConfirmationToAbortEditing(), ['abort', 'ok']).subscribe(response => {
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

    //#endregion

    //#region public methods

    public onDelete(): void {
        this.dialogService.open('warningColor', this.messageService.askConfirmationToDelete(), ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.pickupPointService.delete(this.form.value.id).subscribe(() => {
                    this.resetForm()
                    this.showSnackbar(this.messageService.recordDeleted(), 'info')
                    this.onGoBack()
                }, errorCode => {
                    this.showSnackbar(this.messageService.getHttpErrorMessage(errorCode), 'error')
                })
            }
        })
    }

    public onGetHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack(): void {
        this.router.navigate([this.url], { relativeTo: this.activatedRoute })
    }

    public onLookupIndex(lookupArray: any[], title: string, formFields: any[], fields: any[], headers: any[], widths: any[], visibility: any[], justify: any[], value: { target: { value: any } }): void {
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

    public onSave(): void {
        if (this.form.value.id === 0 || this.form.value.id === null) {
            this.pickupPointService.add(this.form.value).subscribe(() => {
                this.focus('description')
                this.initFormAfterDelay()
                this.showSnackbar(this.messageService.recordCreated(), 'info')
            }, errorCode => {
                this.showSnackbar(this.messageService.getHttpErrorMessage(errorCode), 'error')
            })
        } else {
            this.pickupPointService.update(this.form.value.id, this.form.value).subscribe(() => {
                this.showSnackbar(this.messageService.recordUpdated(), 'info')
                this.resetForm()
                this.onGoBack()
            }, errorCode => {
                this.showSnackbar(this.messageService.getHttpErrorMessage(errorCode), 'error')
            })
        }
    }

    //#endregion

    //#region private methods

    private addShortcuts(): void {
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

    private clearFields(result: any, id: any, description: any): void {
        this.form.patchValue({ [id]: result ? result.id : '' })
        this.form.patchValue({ [description]: result ? result.description : '' })
    }

    private focus(field: string): void {
        this.helperService.setFocus(field)
    }

    private getRecord(id: number): void {
        this.pickupPointService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        }, errorCode => {
            this.showSnackbar(this.messageService.getHttpErrorMessage(errorCode), 'error')
            this.onGoBack()
        })
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            routeId: [0, Validators.required], routeDescription: [{ value: '', disabled: true }, Validators.required],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            exactPoint: ['', [Validators.required, Validators.maxLength(128)]],
            time: ['', [Validators.required, ValidationService.isTime]],
            isActive: true,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private initFormAfterDelay(): void {
        setTimeout(() => {
            this.initForm()
        }, 200)
    }

    private patchFields(result: any, fields: any[]): void {
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

    private patchRouteFields(): void {
        setTimeout(() => {
            const route: any[] = this.routes.filter(x => x.routeId === this.routeId)
            this.form.patchValue({
                routeId: this.routeId,
                routeDescription: route[0].routeDescription
            })
        }, 500)
    }

    private populateDropDowns(): Subscription {
        const sources = []
        sources.push(this.routeService.getAllActive())
        return forkJoin(sources).subscribe(
            result => {
                this.routes = result[0]
                this.renameObjects()
            }
        )
    }

    private populateFields(result: PickupPoint): void {
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

    private renameKey(obj: unknown, oldKey: string, newKey: string): void {
        if (oldKey !== newKey) {
            Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey))
            delete obj[oldKey]
        }
    }

    private renameObjects(): void {
        this.routes.forEach((obj: any) => {
            this.renameKey(obj, 'id', 'routeId')
            this.renameKey(obj, 'description', 'routeDescription')
            this.renameKey(obj, 'isActive', 'routeIsActive')
            this.renameKey(obj, 'userId', 'routeUserId')
        })
    }

    private resetForm(): void {
        this.form.reset()
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showModalIndex(elements: any, title: string, fields: any[], headers: any[], widths: any[], visibility: any[], justify: any[]): void {
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

    private showSnackbar(message: string, type: string): void {
        this.snackbarService.open(message, type)
    }

    private unsubscribe(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    //#endregion

    //#region getters

    get routeDescription(): AbstractControl {
        return this.form.get('routeDescription')
    }

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get exactPoint(): AbstractControl {
        return this.form.get('exactPoint')
    }

    get time(): AbstractControl {
        return this.form.get('time')
    }

    //#endregion

}
