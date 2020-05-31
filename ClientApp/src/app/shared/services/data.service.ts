import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

export class DataService {

    constructor(public http: HttpClient, public url: string) { }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(catchError(this.handleError))
    }

    getSingle(id: string | number) {
        return this.http.get<any>(this.url + '/' + id)
    }

    add(formData: any): Observable<any> {
        return this.http.post<any>(this.url, formData)
    }

    update(id: string | number, formData: any): Observable<any> {
        return this.http.put<any>(this.url + '/' + id, formData)
    }

    delete(id: string | number): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id)
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log(errorResponse.error.message)
        } else {
            console.log(errorResponse)
        }
        return throwError('There was an error contacting the Api')
    }

}
