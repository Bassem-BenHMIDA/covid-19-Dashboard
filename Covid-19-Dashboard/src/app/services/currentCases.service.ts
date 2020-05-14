import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { ICovid } from './ICovid';


const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CurrentCasesService {
  public cases: ICovid[] = [];
  private covidUrl = 'https://corona.lmao.ninja/v2/countries/';
  diffCases: ICovid;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }
  getAllCases(): Observable<ICovid[]> {
    return this.http.get<ICovid[]>(this.covidUrl)
      ;

  }

  public getCaseByCountry(countryIso: string): Observable<ICovid> {
    return this.http.get<ICovid>(this.covidUrl + countryIso.toUpperCase())
      ;
  }



  public convertDate(dateMilis: number) {
    let date = this.datepipe.transform(new Date(dateMilis), 'yyyy-MM-dd HH:mm')
    return date;
  }
  public displayNumber(myNumber: number) {
    let formatedNumber=(myNumber > 0) ? ('+' + myNumber): myNumber;
    return formatedNumber;
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
