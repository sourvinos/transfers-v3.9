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
import { ConfirmValidParentMatcher, ValidationService } from 'src/app/shared/services/validation.service'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { UserService } from '../classes/user.service'
import { ChangePassword } from '../classes/change-password'
import { AccountService } from 'src/app/shared/services/account.service'
import { LabelMessageService } from 'src/app/shared/services/label.service'
import { HintService } from 'src/app/shared/services/hint.service'

@Component({
    selector: 'change-password-form',
    templateUrl: './change-password.component.html',
    styleUrls: ['../../../assets/styles/forms.css', './change-password.component.css']
})

export class ChangePasswordFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/users'
    windowTitle = 'Change password'
    feature = 'changePasswordForm'

    //#endregion

    //#region Form

    confirmValidParentMatcher = new ConfirmValidParentMatcher();
    flatForm: ChangePassword
    hidePassword = true

    //#endregion

    constructor(
        private accountService: AccountService, private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private hintService: HintService, private keyboardShortcutsService: KeyboardShortcuts, private labelService: LabelMessageService, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title, private userService: UserService,) {
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
        this.focus('currentPassword')
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    canDeactivate(): boolean {
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

    public getHint(id: string) {
        return this.hintService.getHintDescription(id)
    }

    public getLabel(id: string) {
        return this.labelService.getLabelDescription(this.feature, id)
    }

    public onGoBack() {
        this.router.navigate([this.url])
    }

    public onSave() {
        this.flattenFormFields()
        this.userService.updatePassword(this.flatForm).subscribe(() => {
            this.showSnackbar(this.messageService.passwordChanged(), 'info')
            this.resetForm()
            this.accountService.logout()
        }, () => {
            this.showSnackbar(this.messageService.wrongCurrentPassword(), 'error')
        })
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'goBack')
                }
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

    private flattenFormFields() {
        this.flatForm = {
            userId: this.form.value.userId,
            currentPassword: this.form.value.currentPassword,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword
        }
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private getRecord(id: string) {
        this.userService.getSingle(id).subscribe(result => {
            this.populateFields(result)
        }, errorCode => {
            this.showSnackbar(this.messageService.getHttpErrorMessage(errorCode), 'error')
            this.onGoBack()
        })
    }

    private initForm() {
        this.form = this.formBuilder.group({
            userId: '',
            currentPassword: ['', [Validators.required]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128), ValidationService.containsSpace]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: ValidationService.childrenEqual })
        })

    }

    private populateFields(result: { id: any }) {
        this.form.patchValue({
            userId: result.id
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

    get CurrentPassword(): AbstractControl {
        return this.form.get('currentPassword')
    }

    get Passwords(): AbstractControl {
        return this.form.get('passwords')
    }

    get Password(): AbstractControl {
        return this.form.get('passwords.password')
    }

    get ConfirmPassword(): AbstractControl {
        return this.form.get('passwords.confirmPassword')
    }

    get MatchingPasswords(): boolean {
        return this.form.get('passwords.password').value === this.form.get('passwords.confirmPassword').value
    }

    //#endregion

}
