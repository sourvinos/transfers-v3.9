import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { AccountService } from 'src/app/shared/services/account.service'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { KeyboardShortcuts, Unlisten } from '../../shared/services/keyboard-shortcuts.service'
import { ConfirmValidParentMatcher, ValidationService } from '../../shared/services/validation.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'

@Component({
    selector: 'reset-password-form',
    templateUrl: './reset-password.component.html',
    styleUrls: ['../../../assets/styles/forms.css', './reset-password.component.css'],
    animations: [slideFromLeft, slideFromRight]
})

export class ResetPasswordFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region variables

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/'
    windowTitle = 'Reset password'
    feature = 'resetPasswordForm'

    //#endregion

    //#region particular variables

    email: string
    token: string
    confirmValidParentMatcher = new ConfirmValidParentMatcher()
    hidePassword = true

    //#endregion

    constructor(
        private accountService: AccountService, private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageHintService, private keyboardShortcutsService: KeyboardShortcuts, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private router: Router, private snackbarService: SnackbarService) {
        this.activatedRoute.queryParams.subscribe((p) => {
            this.email = p['email']
            this.token = p['token']
        })
    }

    //#region lifecycle hooks

    ngOnInit() {
        this.initForm()
        this.addShortcuts()
    }

    ngAfterViewInit() {
        this.focus('password')
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.unsubscribe()
        this.unlisten()
    }

    //#endregion
   
    //#region global methods

    public onGetHint(id: string, minmax = 0) {
        return this.messageHintService.getDescription(id, minmax)
    }

    public onGetLabel(id: string) {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onSave() {
        const form = this.form.value
        this.accountService.resetPassword(form.email, form.passwords.password, form.passwords.confirmPassword, form.token).subscribe(() => {
            this.showSnackbar(this.messageSnackbarService.passwordChanged(), 'info')
            this.router.navigate([this.url])
        }, () => {
            this.showSnackbar(this.messageSnackbarService.unableToResetPassword(), 'error')
        })
    }

    //#endregion

    //#region private methods
    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Alt.S': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length === 0) {
                    this.buttonClickService.clickOnButton(event, 'save')
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

    private initForm() {
        this.form = this.formBuilder.group({
            email: [this.email],
            token: [this.token],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128), ValidationService.containsSpace]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: ValidationService.childrenEqual })
        })
    }

    private showSnackbar(message: string, type: string) {
        this.snackbarService.open(message, type)
    }

    //#endregion

    //#region getters

    get passwords() {
        return this.form.get('passwords')
    }

    get password() {
        return this.form.get('passwords.password')
    }

    get confirmPassword() {
        return this.form.get('passwords.confirmPassword')
    }

    get matchingPasswords(): boolean {
        return this.form.get('passwords.password').value === this.form.get('passwords.confirmPassword').value
    }

    //#endregion

}
