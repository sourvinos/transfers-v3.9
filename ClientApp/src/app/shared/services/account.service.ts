import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { UserIdleService } from 'angular-user-idle'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IndexDBService } from './indexdb.service'

@Injectable({ providedIn: 'root' })

export class AccountService {

    private urlRegister = '/api/account/register'
    private urlForgotPassword = '/api/account/forgotPassword'
    private urlResetPassword = '/api/account/resetPassword'
    private urlToken = '/api/auth/auth'
    private urlChangePassword = '/api/account/changePassword'

    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus())
    private displayName = new BehaviorSubject<string>(localStorage.getItem('displayName'))
    private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole'))

    constructor(private httpClient: HttpClient, private router: Router, private userIdleService: UserIdleService, private indexDBService: IndexDBService) { }

    forgotPassword(email: string) {
        return this.httpClient.post<any>(this.urlForgotPassword, { email })
    }

    login(userName: string, password: string) {
        const grantType = 'password'
        return this.httpClient.post<any>(this.urlToken, { userName, password, grantType }).pipe(map(response => {
            this.setLoginStatus(true)
            this.setLocalStorage(response)
            this.setUserData()
        }))
    }

    logout() {

        this.indexDBService.deleteSetting('jwt')

        this.setLoginStatus(false)
        this.clearLocalStorage()
        this.resetTimer()
        this.navigateToLogin()
    }

    register(formData: any) {
        return this.httpClient.post<any>(this.urlRegister, formData)
    }

    resetPassword(email: string, password: string, confirmPassword: string, token: string) {
        return this.httpClient.post<any>(this.urlResetPassword, { email, password, confirmPassword, token })
    }

    getNewRefreshToken(): Observable<any> {
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

    private checkLoginStatus(): boolean {
        const loginCookie = localStorage.getItem('loginStatus')
        if (loginCookie === '1') {
            if (localStorage.getItem('jwt') !== null || localStorage.getItem('jwt') !== undefined) {
                return true
            }
        }
        return false
    }

    private clearLocalStorage() {
        localStorage.removeItem('displayName')
        localStorage.removeItem('expiration')
        localStorage.removeItem('jwt')
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userId')
    }

    private navigateToLogin() {
        this.router.navigate(['/login'])
    }

    private resetTimer() {
        this.userIdleService.stopWatching()
        this.userIdleService.resetTimer()
    }

    private setLoginStatus(status: boolean) {
        this.loginStatus.next(status)
    }

    private setLocalStorage(response: any) {
        localStorage.setItem('displayName', response.response.displayName)
        localStorage.setItem('expiration', response.response.expiration)
        localStorage.setItem('jwt', response.response.token)
        localStorage.setItem('loginStatus', '1')
        localStorage.setItem('refreshToken', response.response.refresh_token)
        localStorage.setItem('userRole', response.response.roles)
        localStorage.setItem('userId', response.response.userId)
    }

    private setUserData() {
        this.displayName.next(localStorage.getItem('displayName'))
        this.userRole.next(localStorage.getItem('userRole'))
    }

    //#region Getters

    get currentDisplayName(): Observable<string> {
        return this.displayName.asObservable()
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loginStatus.asObservable()
    }

    //#endregion

}
