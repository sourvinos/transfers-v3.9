import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { AccountService } from 'src/app/shared/services/account.service'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { RegisterUser } from '../../account/classes/register-user'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { ConfirmValidParentMatcher, ValidationService } from '../../shared/services/validation.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'register-user-form',
    templateUrl: './register-user-form.component.html',
    styleUrls: ['../../../assets/styles/forms.css', './register-user-form.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class RegisterUserFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region variables

    private feature = 'registerUserForm'
    private ngUnsubscribe = new Subject<void>()
    private unlisten: Unlisten
    private url = '/users'
    private windowTitle = 'User'
    public environment = environment.production
    public form: FormGroup
    public input: InputTabStopDirective

    //#endregion

    //#region particular variables

    private flatForm: RegisterUser
    public confirmValidParentMatcher = new ConfirmValidParentMatcher();
    public hidePassword = true

    //#endregion

    constructor(private accountService: AccountService, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.setWindowTitle()
        this.initForm()
        this.addShortcuts()
    }

    ngAfterViewInit(): void {
        this.focus('userName')
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    canDeactivate(): boolean {
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

    public onGetHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onGetLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onGoBack(): void {
        this.router.navigate([this.url])
    }

    public onSave(): void {
        this.flattenFormFields()
        this.accountService.register(this.flatForm).subscribe(() => {
            this.showSnackbar(this.messageSnackbarService.recordCreated(), 'info')
            this.resetForm()
            this.onGoBack()
        }, errorFromInterceptor => {
            // 200 = Ok
            // 492 = Unable to register user (username and/or email already exist)
            // 500 = Invalid model
            this.showSnackbar(this.messageSnackbarService.filterError(errorFromInterceptor), 'error')
        })
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

    private flattenFormFields(): void {
        this.flatForm = {
            userName: this.form.value.userName,
            displayName: this.form.value.displayName,
            email: this.form.value.email,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword,
            isAdmin: this.form.value.isAdmin,
            language: this.helperService.readItem('language')
        }
    }

    private focus(field: string): void {
        this.helperService.setFocus(field)
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            userName: [environment.newUser.username, [Validators.required, Validators.maxLength(32), ValidationService.containsSpace]],
            displayName: [environment.newUser.displayName, [Validators.required, Validators.maxLength(32)]],
            email: [environment.newUser.email, [Validators.required, Validators.maxLength(128), Validators.email]],
            passwords: this.formBuilder.group({
                password: [environment.newUser.password, [Validators.required, Validators.minLength(10), Validators.maxLength(128), ValidationService.containsSpace]],
                confirmPassword: [environment.newUser.confirmPassword, [Validators.required, ValidationService.containsSpace]]
            }, { validator: ValidationService.childrenEqual }),
            isAdmin: false,
            isActive: false
        })
    }

    private resetForm(): void {
        this.form.reset()
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string | string[], type: string): void {
        this.snackbarService.open(message, type)
    }

    //#endregion

    //#region getters

    get email(): AbstractControl {
        return this.form.get('email')
    }

    get displayName(): AbstractControl {
        return this.form.get('displayName')
    }

    get userName(): AbstractControl {
        return this.form.get('userName')
    }

    get passwords(): AbstractControl {
        return this.form.get('passwords')
    }

    get password(): AbstractControl {
        return this.form.get('passwords.password')
    }

    get confirmPassword(): AbstractControl {
        return this.form.get('passwords.confirmPassword')
    }

    get matchingPasswords(): boolean {
        return this.form.get('passwords.password').value === this.form.get('passwords.confirmPassword').value
    }

    get isAdmin(): AbstractControl {
        return this.form.get('isAdmin')
    }

    //#endregion

}
