import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators'
import { AccountService } from './account.service'

@Injectable({ providedIn: 'root' })

export class JwtInterceptor {

    //#region variables

    private isTokenRefreshing = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //#endregion

    constructor(private accountService: AccountService) { }

    //#region public methods

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isUserLoggedIn()) {
            return next.handle(this.attachTokenToRequest(request)).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) { return }
                }), catchError((err): Observable<any> => {
                    if (this.isUserLoggedIn()) {
                        if (err instanceof HttpErrorResponse) {
                            switch ((<HttpErrorResponse>err).status) {
                                case 401:
                                    return this.handleHttpErrorResponse(request, next)
                                case 403:
                                    return throwError(403)
                                case 404:
                                    console.log('Interceptor: 404') // Not found
                                    return throwError(404)
                                case 409:
                                    console.log('Interceptor: 409')
                                    return throwError(409) // Conflict
                                case 490:
                                    console.log('Interceptor: 490')
                                    return throwError(490) // Unable to save
                                case 491:
                                    console.log('Interceptor: 491')
                                    return throwError(491) // Unable to delete because the record is in use
                                case 492:
                                    console.log('Interceptor: 492')
                                    return throwError(492) // Unable to register user
                                case 493:
                                    console.log('Interceptor: 493')
                                    return throwError(493) // Unable to reset password
                                case 494:
                                    console.log('Interceptor: 494')
                                    return throwError(494) // Unable to change password
                                case 495:
                                    console.log('Interceptor: 495')
                                    return throwError(495) // Account not confirmed
                                case 500:
                                    console.log('Interceptor: 500') // Very bad
                                    return throwError(500)
                            }
                        } else {
                            return throwError(this.handleError)
                        }
                    }
                })
            )
        } else {
            return next.handle(request)
        }
    }

    //#endregion

    //#region private methods

    private attachTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
        const token = localStorage.getItem('jwt')
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    private handleError(errorResponse: HttpErrorResponse): string {
        if (errorResponse.error instanceof Error) {
            return `Front-end error ${errorResponse.error.message}`
        } else {
            return `Server error ${errorResponse.status} ${errorResponse.error}`
        }
    }

    private handleHttpErrorResponse(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true
            this.tokenSubject.next(null)
            return this.accountService.getNewRefreshToken().pipe(
                switchMap((tokenresponse: any) => {
                    if (tokenresponse) {
                        this.tokenSubject.next(tokenresponse.response.token)
                        localStorage.setItem('loginStatus', '1')
                        localStorage.setItem('jwt', tokenresponse.response.token)
                        localStorage.setItem('userId', tokenresponse.response.userId)
                        localStorage.setItem('displayName', tokenresponse.response.displayName)
                        localStorage.setItem('expiration', tokenresponse.response.expiration)
                        localStorage.setItem('userRole', tokenresponse.response.roles)
                        localStorage.setItem('refreshToken', tokenresponse.response.refresh_token)
                        console.log('Token refreshed')
                        return next.handle(this.attachTokenToRequest(request))
                    }
                    return <any>this.accountService.logout()
                }),
                catchError(error => {
                    this.accountService.logout()
                    return this.handleError(error)
                }),
                finalize(() => {
                    this.isTokenRefreshing = false
                })
            )
        } else {
            this.isTokenRefreshing = false
            return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(() => next.handle(this.attachTokenToRequest(request))))
        }
    }

    private isUserLoggedIn(): boolean {
        return localStorage.getItem('loginStatus') === '1'
    }

    //#endregion

}
