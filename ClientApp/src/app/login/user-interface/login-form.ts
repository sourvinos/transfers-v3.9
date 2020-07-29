import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { UserIdleService } from 'angular-user-idle'
import { Subject } from 'rxjs'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { HelperService } from 'src/app/shared/services/helper.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { AccountService } from '../../shared/services/account.service'
import { SnackbarService } from './../../shared/services/snackbar.service'

@Component({
    selector: 'login-form',
    templateUrl: './login-form.html',
    styleUrls: ['../../shared/styles/forms.css', './login-form.css']
})

export class LoginFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //#region 

    form: FormGroup
    input: InputTabStopDirective
    ngUnsubscribe = new Subject<void>()
    unlisten: Unlisten
    url = '/'
    windowTitle = 'Login'

    //#endregion

    //#region 

    hidePassword = true

    //#endregion

    constructor(private accountService: AccountService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private router: Router, private snackbarService: SnackbarService, private userIdleService: UserIdleService, private titleService: Title) { }

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

    public onForgotPassword() {
        this.router.navigate(['/forgotPassword'])
    }

    public onLogin() {
        const form = this.form.value
        this.accountService.login(form.userName, form.password).subscribe(() => {
            this.goHome()
            this.startTimer()
        }, error => {
            this.showSnackbar(error.error.response, 'error')
        })
    }

    private addShortcuts() {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Alt.L': (event: KeyboardEvent): void => {
                event.preventDefault()
                document.getElementById('login').click()
            }
        }, {
            priority: 2,
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
            userName: [isDevMode ? 'sourvinos' : '', Validators.required],
            password: [isDevMode ? '1234567890' : '', Validators.required]
        })
    }

    private setWindowTitle() {
        this.titleService.setTitle(this.helperService.getApplicationTitle() + ' :: ' + this.windowTitle)
    }

    private showSnackbar(message: string | string[], type: string): void {
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
