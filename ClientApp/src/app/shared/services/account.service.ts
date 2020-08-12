import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { UserIdleService } from 'angular-user-idle'
import { map } from 'rxjs/operators'
import { IndexDBService } from './indexdb.service'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class AccountService {

    private urlRegister = '/api/account/register'
    private urlForgotPassword = '/api/account/forgotPassword'
    private urlResetPassword = '/api/account/resetPassword'
    private urlToken = '/api/auth/auth'
    private urlChangePassword = '/api/account/changePassword'

    private loginStatus: Promise<string>

    constructor(private httpClient: HttpClient, private router: Router, private userIdleService: UserIdleService, private indexDBService: IndexDBService) { }

    forgotPassword(email: string) {
        return this.httpClient.post<any>(this.urlForgotPassword, { email })
    }

    login(userName: string, password: string) {
        const grantType = 'password'
        return this.httpClient.post<any>(this.urlToken, { userName, password, grantType }).pipe(map(response => {
            this.setIndexedDB(response)
            // this.setLocalStorage(response)
            // this.getUserData()
        }))
    }

    logout() {
        this.clearLocalStorage()
        this.deleteIndexedDB()
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
                    // this.setLoginStatus(true)
                    this.setLocalStorage(response)
                }
                return <any>response
            })
        )
    }

    private async checkLoginStatus(): Promise<boolean> {
        // const loginCookie = localStorage.getItem('loginStatus')
        const loginCookie = await this.indexDBService.getSetting('loginStatus')
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

    private deleteIndexedDB() {
        this.indexDBService.deleteDatabase()
    }

    private navigateToLogin() {
        this.router.navigate(['/login'])
    }

    private resetTimer() {
        this.userIdleService.stopWatching()
        this.userIdleService.resetTimer()
    }

    private setIndexedDB(response: any) {
        this.indexDBService.addSetting({ 'id': 'displayName', 'key': response.response.displayName })
        this.indexDBService.addSetting({ 'id': 'expiration', 'key': response.response.expiration })
        this.indexDBService.addSetting({ 'id': 'jwt', 'key': response.response.token })
        this.indexDBService.addSetting({ 'id': 'loginStatus', 'key': '1' })
        this.indexDBService.addSetting({ 'id': 'refreshToken', 'key': response.response.refresh_token })
        this.indexDBService.addSetting({ 'id': 'userRole', 'key': response.response.roles })
        this.indexDBService.addSetting({ 'id': 'userId', 'key': response.response.userId })
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

    async getUsername() {
        return await this.indexDBService.getSetting('displayName')
    }

    async getLoginStatus() {
        return await this.indexDBService.getSetting('loginStatus')
    }

}
