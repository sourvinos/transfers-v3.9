import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { MessageService } from 'src/app/shared/services/message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Driver } from '../classes/driver'
import { DriverService } from '../classes/driver.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'driver-form',
    templateUrl: './driver-form.component.html',
    styleUrls: ['../../../assets/styles/forms.css']
})

export class DriverFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region 

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/drivers'
    windowTitle = 'Driver'
    environment: boolean = environment.production

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private driverService: DriverService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) {
        this.activatedRoute.params.subscribe(p => {
            if (p.id) { this.getRecord(p.id) }
        })
    }

    ngOnInit() {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
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
            this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToAbortEditing(), ['cancel', 'ok']).subscribe(response => {
                if (response) {
                    this.resetForm()
                    this.onGoBack()
                    return true
                } else {
                    this.focus('description')
                }
            })
        } else {
            return true
        }
    }

    public onSetActiveState() {
        if (this.form.value.isDefault === false) { this.form.patchValue({ isActive: true }) }
    }

    public onSetDefaultState() {
        if (this.form.value.isActive === true) { this.form.patchValue({ isDefault: false }) }
    }

    public onDelete() {
        this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToDelete(), ['cancel', 'ok']).subscribe(response => {
            if (response) {
                this.driverService.delete(this.form.value.id).subscribe(() => {
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
        this.router.navigate([this.url])
    }

    public onSave() {
        if (this.form.value.id === 0) {
            this.driverService.add(this.form.value).subscribe(() => {
                this.focus('description')
                this.initFormAfterDelay()
                this.showSnackbar(this.messageService.recordCreated(), 'info')
            }, error => {
                this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            })
        } else {
            this.driverService.update(this.form.value.id, this.form.value).subscribe(() => {
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
                    this.buttonClickService.clickOnButton(event, 'cancel')
                }
            },
            'Alt.O': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'ok')
                }
            }
        }, {
            priority: 1,
            inputs: true
        })
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private getRecord(id: string | number) {
        this.driverService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        }, error => {
            this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            this.onGoBack()
        })
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: 0,
            description: ['', [Validators.required, Validators.maxLength(128)]],
            phones: ['', [Validators.maxLength(128)]],
            isDefault: false,
            isActive: true,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private initFormAfterDelay() {
        setTimeout(() => {
            this.initForm()
        }, 200)
    }

    private populateFields(result: Driver) {
        this.form.setValue({
            id: result.id,
            description: result.description,
            phones: result.phones,
            isActive: result.isActive,
            isDefault: result.isDefault,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private resetForm() {
        this.form.reset()
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string, type: string) {
        this.snackbarService.open(message, type)
    }

    private unsubscribe() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
    }

    //#region Getters

    get description() {
        return this.form.get('description')
    }

    get phones() {
        return this.form.get('phones')
    }

    get isActive() {
        return this.form.get('isActive')
    }

    //#endregion

}
