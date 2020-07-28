import { Injectable } from '@angular/core';
import { Class } from './class';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

    private sclassesUrl = 'api/sclasses';  // URL to web api  

  getClasses(): Observable<Class[]>{
    return this.http.get<Class[]>(this.sclassesUrl)
    .pipe(
      tap(_ => this.log('fetched classes')),
      catchError(this.handleError<Class[]>('getClasses',[]))
    );
  }

  getClass(id: number): Observable<Class>{
    const url = `${this.sclassesUrl}/${id}`;
    return this.http.get<Class>(url).pipe(
      tap(_ => this.log(`fetched class id=${id}`)),
      catchError(this.handleError<Class>(`getClass id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /*addClass(sclass: Class): Observable<Class> {
    this.http.post<Class>(this.sclassesUrl, sclass, this.httpOptions).pipe(
      map((sclass: Class) => {this.log(`added class w/ num=${sclass.num} letter=${sclass.letter}`); console.log(sclass); return  sclass}),
      catchError(this.handleError<Class>('addClass'))
    );
  }*/

  addClass(sclass: Class): Observable<Class> {
    return this.http.post<Class>(this.sclassesUrl, sclass, this.httpOptions).pipe(
      tap((newSClass: Class) => this.log(`added class id=${newSClass.id}`)),
      catchError(this.handleError<Class>('addClass'))
    );
  }

  updateClass(sclass: Class): Observable<any> {
    return this.http.put(this.sclassesUrl, sclass, this.httpOptions).pipe(
      tap(_ => this.log(`updated sclass id=${sclass.id}`)),
      catchError(this.handleError<any>('updateClass'))
    );
  }
  /*addClass(sclass: Class): Observable<any> {
    return this.http.put(this.sclassesUrl, sclass, this.httpOptions).pipe(
      tap(_ => this.log(`updated sclass num=${sclass.num} letter${sclass.letter}`)),
      catchError(this.handleError<any>('updateClass'))
    );
  }*/

  deleteClass(sclass: Class | number): Observable<Class> {
    
    const id = typeof sclass === 'number' ? sclass : sclass.id;
    //const letter = typeof sclass1 === 'string' ? sclass1 : sclass1.letter;
    const url = `${this.sclassesUrl}/${id}`;
  
    return this.http.delete<Class>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted subject num=${id}`)),
      catchError(this.handleError<Class>('deleteClass'))
    );
  }

   private log(message: string) {
    this.messageService.add(`ClassService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
