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
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'

@Component({
    selector: 'register-user-form',
    templateUrl: './register-user.component.html',
    styleUrls: ['../../../assets/styles/forms.css', './register-user.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class RegisterUserFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/users'
    windowTitle = 'User'

    //#endregion

    //#region

    flatForm: RegisterUser
    hidePassword = true
    confirmValidParentMatcher = new ConfirmValidParentMatcher();

    //#endregion

    constructor(private accountService: AccountService, private buttonClickService: ButtonClickService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private titleService: Title) { }

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

    public onGoBack() {
        this.router.navigate([this.url])
    }

    public onSave() {
        this.flattenFormFields()
        this.accountService.register(this.flatForm).subscribe(() => {
            this.resetForm()
            this.showSnackbar(this.messageService.recordCreated(), 'info')
            this.onGoBack()
        }, () => {
            this.showSnackbar(this.messageService.unableToRegisterUser(), 'error')
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

    private flattenFormFields() {
        this.flatForm = {
            userName: this.form.value.userName,
            displayName: this.form.value.displayName,
            email: this.form.value.email,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword
        }
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private initForm() {
        this.form = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.maxLength(32)]],
            displayName: ['', [Validators.required, Validators.maxLength(32)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128), ValidationService.containsSpace]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: ValidationService.childrenEqual })
        })
    }

    private resetForm() {
        this.form.reset()
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string | string[], type: string) {
        this.snackbarService.open(message, type)
    }

    //#region Getters

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

    //#endregion

}
