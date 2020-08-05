import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageService } from 'src/app/shared/services/message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { UserService } from '../classes/user.service'

@Component({
    selector: 'edit-user-form',
    templateUrl: './edit-user-form.html',
    styleUrls: ['../../shared/styles/forms.css']
})

export class EditUserFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region 
    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/users'
    windowTitle = 'User'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private userService: UserService, private titleService: Title) {
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
        this.focus('userName')
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    canDeactivate(): boolean {
        if (this.form.dirty) {
            this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToAbortEditing(), ['cancel', 'ok']).subscribe(response => {
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

    public onChangePassword() {
        if (this.form.dirty) {
            this.userService.update(this.form.value.id, this.form.value).subscribe(() => {
                this.router.navigate(['/users/changePassword/' + this.form.value.id])
                this.resetForm()
            }, error => {
                this.showSnackbar(error.error.response, 'error')
            })
        } else {
            this.router.navigate(['/users/changePassword/' + this.form.value.id])
        }
    }

    public onDelete() {
        this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToDelete(), ['ok', 'cancel']).subscribe(response => {
            if (response) {
                this.userService.delete(this.form.value.id).subscribe((response) => {
                    this.resetForm()
                    this.showSnackbar(response.response, 'info')
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
        this.userService.update(this.form.value.id, this.form.value).subscribe((response) => {
            this.resetForm()
            this.showSnackbar(response.response, 'info')
            this.onGoBack()
        }, error => {
            this.showSnackbar(error.error.response, 'error')
        })
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'goBack')
                }
            },
            'Alt.C': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'cancel')
                } else {
                    this.buttonClickService.clickOnButton(event, 'changePassword')
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

    private getRecord(id: string) {
        this.userService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        })
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: '',
            userName: ['', [Validators.required, Validators.maxLength(32)]],
            displayName: ['', [Validators.required, Validators.maxLength(32)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
        })
    }

    private populateFields(result: { id: number; username: string; displayname: string; email: string }) {
        this.form.setValue({
            id: result.id,
            userName: result.username,
            displayName: result.displayname,
            email: result.email
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

    //#region Getters
    get Username(): AbstractControl {
        return this.form.get('userName')
    }

    get Displayname(): AbstractControl {
        return this.form.get('displayName')
    }

    get Email(): AbstractControl {
        return this.form.get('email')
    }

    //#endregion

}
