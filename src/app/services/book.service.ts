import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ITitle } from '../interfaces/Title';
// import {ErrorObservable} from 'rxjs/observable/ErrorObservable'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  _baseUrl:string = "https://localhost:44330/api/books";
  _baseUrlPrfile: string = "https://localhost:3000/profile";
  _baseUrlTitles: string = "https://localhost:44330/api/titles";
  _baseUrlPivotedTitles: string = "https://localhost:44330/api/pivotedtitles";
  public headers:Headers; 
  data = [];

  constructor(private http: HttpClient) { 
    this.headers = new Headers();  //*******
    this.headers.append('Content-Type', 'application/json')
  }

  
  getTitlesPagination(params):Observable<ITitle[]>{
    let body: HttpParams = new HttpParams();    
    body = body.append("startRow", params.startRow);
    body = body.append("endRow", params.endRow);
    // let headers: HttpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post<ITitle[]>(this._baseUrlTitles,JSON.stringify(body),{ headers : new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getPivotedTitles():Observable<[]>{    
    return  this.http.get<[]>(this._baseUrlPivotedTitles).pipe(catchError(this.handleError));
  }



  handleError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.log('ClientSide Error: ',errorResponse.error.message);
    }else{
      console.log('ServerSide Error: ',errorResponse.error.message);
    }
    return throwError(errorResponse);
  }
}
