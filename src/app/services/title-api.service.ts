import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ITitleMasterViewModel } from '../interfaces/iTitleMasterViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleApiService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public get(startRow, pageCount)
  {
    return this.httpClient.get<ITitleMasterViewModel>(`${environment.apiUris.titleMasterApi}?startRow=${startRow}&endRow=${pageCount}`).pipe(catchError(this.handleError));
  }
}
