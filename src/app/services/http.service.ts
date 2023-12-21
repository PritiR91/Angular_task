import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl:string="http://localhost:3000/";
  httpHeaders:HttpHeaders = new HttpHeaders({
    'contentType':'application/json'
  })
  constructor(private http:HttpClient) { }

  postDataToserver(endpoint:string,requestBody:any){
    let url= this.baseUrl + endpoint;
    return this.http.post(url,requestBody,{headers:this.httpHeaders}).pipe(catchError(this.handleHttpErrorResponse));
  }
  getdataFromServer(endpoint:string){
    let url= this.baseUrl + endpoint;
    return this.http.get(url).pipe(catchError(this.handleHttpErrorResponse));
  }
  deleteDataFromServer(endpoint:string){
    let url= this.baseUrl + endpoint;
    return this.http.delete(url,{headers:this.httpHeaders}).pipe(catchError(this.handleHttpErrorResponse));
  }

  deleteRecords(ids:number[]){
    if(confirm('Are you sure want to delete?')){
      const url:string="http://localhost:3000/deletedUser";
      return this.http.post(url,{ids})
    }
    return of({});
  }

  // deleteData(ids: number[]) {
	 
	// 	const data = {'ids' : ids};
	// 	const url ="http://localhost:3000/users";
  //   return this.http.post<any>(url, data);
  // }
  //Error handling 
  handleHttpErrorResponse(error:HttpErrorResponse):any{
    console.log(error);
    if (error.error instanceof ErrorEvent) {
       console.log("Client side error " + error.error.message)
    }else {
      console.log("Server Side Error",error.message);
    }
   return throwError("Unable to process your request at the moment");
  }
}
