import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { DestinationService } from 'src/app/destinations/classes/destination.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { SnackbarMessageService } from 'src/app/shared/services/snackbar-message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Destination } from './../classes/destination'
import { environment } from 'src/environments/environment'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { LabelMessageService } from 'src/app/shared/services/label.service'
import { HintService } from 'src/app/shared/services/hint.service'

@Component({
    selector: 'destination-form',
    templateUrl: './destination-form.component.html',
    styleUrls: ['../../../assets/styles/forms.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class DestinationFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/destinations'
    windowTitle = 'Destination'
    environment: boolean = environment.production
    feature = 'destinationForm'

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private destinationService: DestinationService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private hintService: HintService, private keyboardShortcutsService: KeyboardShortcuts, private labelService: LabelMessageService, private messageService: SnackbarMessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) {
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
        this.focus('abbreviation')
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
                } else {
                    this.focus('abbreviation')
                }
            })
        } else {
            return true
        }
    }

    public getHint(id: string) {
        return this.hintService.getHintDescription(id)
    }

    public getLabel(id: string) {
        return this.labelService.getLabelDescription(this.feature, id)
    }

    public onDelete() {
        this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToDelete(), ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.destinationService.delete(this.form.value.id).subscribe(() => {
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
            this.destinationService.add(this.form.value).subscribe(() => {
                this.focus('abbreviation')
                this.initFormAfterDelay()
                this.showSnackbar(this.messageService.recordCreated(), 'info')
            }, error => {
                this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            })
        } else {
            this.destinationService.update(this.form.value.id, this.form.value).subscribe(() => {
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
            priority: 1,
            inputs: true
        })
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private getRecord(id: string | number) {
        this.destinationService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        }, error => {
            this.showSnackbar(this.messageService.getHttpErrorMessage(error), 'error')
            this.onGoBack()
        })
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: 0,
            abbreviation: ['', [Validators.required, Validators.maxLength(5)]],
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

    private populateFields(result: Destination) {
        this.form.setValue({
            id: result.id,
            abbreviation: result.abbreviation,
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

    //#region Getters

    get abbreviation() {
        return this.form.get('abbreviation')
    }

    get description() {
        return this.form.get('description')
    }

    //#endregion

}
