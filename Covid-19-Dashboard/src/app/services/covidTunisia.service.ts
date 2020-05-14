import { Injectable } from '@angular/core';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
import { ICovid } from './ICovid';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CasesCovid } from '../covid19-tn';
import { CovidChart } from './chartCovidTn';


const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CovidTunisiaService {
  private covidUrl = 'https://services6.arcgis.com/BiTAc9ApDDtL9okN/arcgis/rest/services/Statistiques_par_gouvernorat_(nouvelle_donn%C3%A9e)/FeatureServer/0/query?f=json&where=(Nb_cas%20%3E%3D%201)%20AND%20(Nb_cas%3E%3D1)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Nb_cas%20desc&outSR=102100&resultOffset=0';
  private charUrl = 'https://covid19.knsd.digital/api/?f=api&endpoint=governates';
  constructor(private http: HttpClient) { }
  getAllCases(): Observable<CasesCovid[]> {
    return this.http.get<CasesCovid[]>(this.covidUrl)
      ;
  }

  getTnCovidChart(): Observable<CovidChart[]> {
    return this.http.get<CovidChart[]>(this.charUrl)
      ;
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
