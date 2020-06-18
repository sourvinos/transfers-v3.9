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
import { MessageService } from 'src/app/shared/services/message.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { RegisterUser } from '../../account/classes/register-user'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { ConfirmValidParentMatcher, ValidationService } from '../../shared/services/validation.service'

@Component({
    selector: 'register-user-form',
    templateUrl: './register-user-form.html',
    styleUrls: ['../../shared/styles/forms.css', './register-user-form.css'],
})

export class RegisterUserFormComponent implements OnInit, AfterViewInit, OnDestroy {

    // #region

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/users'
    windowTitle = 'User'

    // #endregion

    // #region

    flatForm: RegisterUser
    hidePassword = true
    confirmValidParentMatcher = new ConfirmValidParentMatcher()

    // #endregion

    constructor(private accountService: AccountService, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

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
            this.dialogService.open('Warning', 'warningColor', this.messageService.askConfirmationToAbortEditing(), ['cancel', 'ok']).subscribe((response) => {
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

    public onGoBack(): void {
        this.router.navigate([this.url])
    }

    public onSave(): void {
        this.flattenFormFields()
        this.accountService.register(this.flatForm).subscribe((response) => {
            this.showSnackbar(response.response, 'info')
            this.resetForm()
            this.onGoBack()
        }, (error) => {
            this.showSnackbar(error.error.response, 'error')
        })
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            Escape: (event: KeyboardEvent): void => {
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
                    this.buttonClickService.clickOnButton(event, 'cancel')
                }
            },
            'Alt.O': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length !== 0) {
                    this.buttonClickService.clickOnButton(event, 'ok')
                }
            },
        }, {
            priority: 1,
            inputs: true,
        })
    }

    private flattenFormFields() {
        this.flatForm = {
            email: this.form.value.email,
            displayName: this.form.value.displayName,
            userName: this.form.value.userName,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword,
        }
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private initForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
            displayName: ['', [Validators.required, Validators.maxLength(32)]],
            userName: ['', [Validators.required, Validators.maxLength(32)]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128), ValidationService.containsSpace]],
                confirmPassword: ['', [Validators.required]],
            }, { validator: ValidationService.childrenEqual }),
        })
    }

    private resetForm() {
        this.form.reset()
    }

    private setWindowTitle() {
        this.titleService.setTitle(`${this.helperService.getApplicationTitle()} :: ${this.windowTitle}`)
    }

    private showSnackbar(message: string | string[], type: string): void {
        this.snackbarService.open(message, type)
    }

    // #region Getters

    get Email(): AbstractControl {
        return this.form.get('email')
    }

    get DisplayName(): AbstractControl {
        return this.form.get('displayName')
    }

    get UserName(): AbstractControl {
        return this.form.get('userName')
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

    // #endregion
}
