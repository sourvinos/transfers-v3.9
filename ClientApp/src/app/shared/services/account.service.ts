import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { UserIdleService } from 'angular-user-idle'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })

export class AccountService {

    //#region variables

    private urlRegister = '/api/account/register'
    private urlForgotPassword = '/api/account/forgotPassword'
    private urlResetPassword = '/api/account/resetPassword'
    private urlToken = '/api/auth/auth'
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus())
    private displayName = new BehaviorSubject<string>(localStorage.getItem('displayName'))
    private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole'))
    private userId = new BehaviorSubject<string>(localStorage.getItem('userId'))

    //#endregion

    constructor(private httpClient: HttpClient, private router: Router, private userIdleService: UserIdleService) { }

    //#region public methods

    public forgotPassword(email: string): Observable<any> {
        return this.httpClient.post<any>(this.urlForgotPassword, { email })
    }

    public getNewRefreshToken(): Observable<any> {
        const userId = localStorage.getItem('userId')
        const refreshToken = localStorage.getItem('refreshToken')
        const grantType = 'refresh_token'
        return this.httpClient.post<any>(this.urlToken, { userId, refreshToken, grantType }).pipe(
            map(response => {
                console.log('Refresh token' + response.response.token)
                if (response.response.token) {
                    this.setLoginStatus(true)
                    this.setLocalStorage(response)
                }
                return <any>response
            })
        )
    }

    public login(userName: string, password: string): Observable<void> {
        const grantType = 'password'
        const language = localStorage.getItem('language') || 'en'
        return this.httpClient.post<any>(this.urlToken, { language, userName, password, grantType }).pipe(map(response => {
            this.setLoginStatus(true)
            this.setLocalStorage(response)
            this.setUserData()
        }))
    }

    public logout(): void {
        this.setLoginStatus(false)
        this.clearLocalStorage()
        this.resetTimer()
        this.navigateToLogin()
    }

    public register(formData: any): Observable<any> {
        return this.httpClient.post<any>(this.urlRegister, formData)
    }

    public resetPassword(email: string, password: string, confirmPassword: string, token: string): Observable<any> {
        return this.httpClient.post<any>(this.urlResetPassword, { email, password, confirmPassword, token })
    }

    //#endregion

    //#region private methods

    private checkLoginStatus(): boolean {
        const loginCookie = localStorage.getItem('loginStatus')
        if (loginCookie === '1') {
            if (localStorage.getItem('jwt') !== null || localStorage.getItem('jwt') !== undefined) {
                return true
            }
        }
        return false
    }

    private clearLocalStorage(): void {
        localStorage.removeItem('displayName')
        localStorage.removeItem('expiration')
        localStorage.removeItem('jwt')
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userId')
    }

    private navigateToLogin(): void {
        this.router.navigate(['/login'])
    }

    private resetTimer(): void {
        this.userIdleService.stopWatching()
        this.userIdleService.resetTimer()
    }

    private setLocalStorage(response: any): void {
        localStorage.setItem('displayName', response.response.displayName)
        localStorage.setItem('expiration', response.response.expiration)
        localStorage.setItem('jwt', response.response.token)
        localStorage.setItem('loginStatus', '1')
        localStorage.setItem('refreshToken', response.response.refresh_token)
        localStorage.setItem('userRole', response.response.roles)
        localStorage.setItem('userId', response.response.userId)
    }

    private setLoginStatus(status: boolean): void {
        this.loginStatus.next(status)
    }

    private setUserData(): void {
        this.displayName.next(localStorage.getItem('displayName'))
        this.userRole.next(localStorage.getItem('userRole'))
        this.userId.next(localStorage.getItem('userId'))
    }

    //#endregion

    //#region getters

    get currentDisplayName(): Observable<string> {
        return this.displayName.asObservable()
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loginStatus.asObservable()
    }

    get currentUserId(): any {
        return this.userId.asObservable()
    }

    //#endregion

}
