import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { CountryHistorical } from './ICountryHistorical';


@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  public countryHistorical: CountryHistorical[] = [];
  private historicalBaseUrl = 'https://corona.lmao.ninja/v2/historical/';

  constructor(private http: HttpClient,public datepipe: DatePipe) { }


  public getHistoricalByCountry(countryIso:string) {
    return this.http.get(this.historicalBaseUrl+countryIso.toUpperCase())
    // .pipe(
    //   tap(data => console.log('CountryHistorical: ' + JSON.stringify(data))),
    //   catchError(this.handleError)
    // )
    ;
  }
  /**
   * name
   */
  public convertDate(dateMilis:number) {
    let date= this.datepipe.transform(new Date(dateMilis), 'yyyy-MM-dd HH:mm')
    return date;
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
