import { SnackbarService } from 'src/app/shared/services/snackbar.service'
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
import { PortService } from '../classes/port.service'
import { environment } from 'src/environments/environment'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'

@Component({
    selector: 'port-form',
    templateUrl: './port-form.component.html',
    styleUrls: ['../../../assets/styles/forms.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class PortFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region variables

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/ports'
    windowTitle = 'Port'
    environment: boolean = environment.production
    feature = 'portForm'

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageHintService, private keyboardShortcutsService: KeyboardShortcuts, private messageLabelService: MessageLabelService, private portService: PortService, private router: Router, private messageSnackbarService: MessageSnackbarService, private titleService: Title, private snackbarService: SnackbarService) {
        this.activatedRoute.params.subscribe(p => {
            if (p.id) { this.getRecord(p.id) }
        })
    }

    //#region lifecycle hooks

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
            this.dialogService.open('warningColor', this.messageSnackbarService.askConfirmationToAbortEditing(), ['abort', 'ok']).subscribe(response => {
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

    public onDelete() {
        this.dialogService.open('warningColor', this.messageSnackbarService.askConfirmationToDelete(), ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.portService.delete(this.form.value.id).subscribe(() => {
                    this.resetForm()
                    this.showSnackbar(this.messageSnackbarService.recordDeleted(), 'info')
                    this.onGoBack()
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
        this.router.navigate([this.url])
    }

    public onSave() {
        if (this.form.value.id === 0) {
            this.portService.add(this.form.value).subscribe(() => {
                this.focus('description')
                this.initFormAfterDelay()
                this.showSnackbar(this.messageSnackbarService.recordCreated(), 'info')
            }, errorCode => {
                this.showSnackbar(this.messageSnackbarService.getHttpErrorMessage(errorCode), 'error')
            })
        } else {
            this.portService.update(this.form.value.id, this.form.value).subscribe(() => {
                this.showSnackbar(this.messageSnackbarService.recordUpdated(), 'info')
                this.resetForm()
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
            priority: 1,
            inputs: true
        })
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private getRecord(id: string | number) {
        this.portService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        }, errorCode => {
            this.showSnackbar(this.messageSnackbarService.getHttpErrorMessage(errorCode), 'error')
            this.onGoBack()
        })
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: 0,
            description: ['', [Validators.required, Validators.maxLength(128)]],
            isActive: true,
            userId: this.helperService.getUserIdFromLocalStorage()
        })
    }

    private initFormAfterDelay() {
        setTimeout(() => {
            this.initForm()
        }, 200)
    }

    private populateFields(result: any) {
        this.form.setValue({
            id: result.id,
            description: result.description,
            isActive: result.isActive,
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

    //#endregion

    //#region getters

    get description() {
        return this.form.get('description')
    }

    //#endregion

}
