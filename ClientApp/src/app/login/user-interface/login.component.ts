import { MessageService } from '../../shared/services/snackbar-message.service'
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { UserIdleService } from 'angular-user-idle'
import { Subject } from 'rxjs'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { AccountService } from '../../shared/services/account.service'
import { SnackbarService } from '../../shared/services/snackbar.service'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { environment } from 'src/environments/environment'
import { fade, slideFromLeft, slideFromRight } from 'src/app/shared/animations/animations'
import { LabelService } from 'src/app/shared/services/label.service.'

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls: ['../../../assets/styles/forms.css', './login.component.css'],
    animations: [fade, slideFromLeft, slideFromRight]
})

export class LoginFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region 

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/'
    windowTitle = 'Login'
    feature = 'login'

    //#endregion

    //#region 
    hidePassword = true

    //#endregion

    constructor(private accountService: AccountService, private buttonClickService: ButtonClickService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private labelService: LabelService, private messageService: MessageService, private router: Router, private snackbarService: SnackbarService, private userIdleService: UserIdleService, private titleService: Title) { }

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

    public labelId(id: string) {
        return this.labelService.getLabelDescription(this.feature, id)
    }

    public onForgotPassword() {
        this.router.navigate(['/forgotPassword'])
    }

    public onLogin() {
        const form = this.form.value
        this.accountService.login(form.userName, form.password).subscribe(() => {
            this.goHome()
            this.startTimer()
        }, error => {
            this.showError(error)
        })
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Alt.F': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'forgotPassword')
            },
            'Alt.L': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'login')
            }
        }, {
            priority: 1,
            inputs: true
        })
    }

    private focus(field: string) {
        this.helperService.setFocus(field)
    }

    private goHome() {
        this.router.navigate([this.url])
    }

    private initForm() {
        this.form = this.formBuilder.group({
            userName: [environment.login.userName, Validators.required],
            password: [environment.login.password, Validators.required],
            isHuman: [environment.login.isHuman, Validators.requiredTrue]
        })
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showError(error: any) {
        switch (error.status) {
            case 400:
                this.showSnackbar(this.messageService.accountNotConfirmed(), 'error')
                break
            case 401:
                this.showSnackbar(this.messageService.authenticationFailed(), 'error')
                break
        }
    }

    private showSnackbar(message: string | string[], type: string) {
        this.snackbarService.open(message, type)
    }

    private startTimer() {
        this.userIdleService.startWatching()
        this.userIdleService.onTimerStart().subscribe()
        this.userIdleService.onTimeout().subscribe(() => {
            this.userIdleService.resetTimer()
            this.accountService.logout()
            this.userIdleService.stopWatching()
        })
    }

    //#region Getters

    get Username() {
        return this.form.get('userName')
    }

    get Password() {
        return this.form.get('password')
    }

    //#endregion

}
