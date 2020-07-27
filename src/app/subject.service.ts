import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from './subject';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  constructor(private http: HttpClient,
              private messageService: MessageService) { }


getSubjects(): Observable<Subject[]> {
  return this.http.get<Subject[]>(this.subjectsUrl)
    .pipe(
      tap(_ => this.log('fetched subjects')),
      catchError(this.handleError<Subject[]>('getSubjects', []))
    );
}

 
 getSubject(id: number): Observable<Subject> {
  const url = `${this.subjectsUrl}/${id}`;
  return this.http.get<Subject>(url).pipe(
    tap(_ => this.log(`fetched subject id=${id}`)),
    catchError(this.handleError<Subject>(`getSubject id=${id}`))
  );
}

getSubjectNo404<Data>(id: number): Observable<Subject> {
  const url = `${this.subjectsUrl}/?id=${id}`;
  return this.http.get<Subject[]>(url)
    .pipe(
      map(subjects => subjects[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} subject id=${id}`);
      }),
      catchError(this.handleError<Subject>(`getSubject id=${id}`))
    );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

updateSubject(subject: Subject): Observable<any> {
  return this.http.put(this.subjectsUrl, subject, this.httpOptions).pipe(
    tap(_ => this.log(`updated subject id=${subject.id}`)),
    catchError(this.handleError<any>('updateSubject'))
  );
}

addSubject(subject: Subject): Observable<Subject> {
   
  return this.http.post<Subject>(this.subjectsUrl, subject, this.httpOptions).pipe(
    tap((newSubject: Subject) => this.log(`added subject w/ id=${newSubject.id}`)),
    catchError(this.handleError<Subject>('addSubject'))
  );
}

deleteSubject(subject: Subject | number): Observable<Subject> {
  const id = typeof subject === 'number' ? subject : subject.id;
  const url = `${this.subjectsUrl}/${id}`;

  return this.http.delete<Subject>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted subject id=${id}`)),
    catchError(this.handleError<Subject>('deleteSubject'))
  );
}

searchSubjects(term: string): Observable<Subject[]> {
  if (!term.trim()) {
    // if not search term, return empty array.
    return of([]);
  }
  return this.http.get<Subject[]>(`${this.subjectsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found subjects matching "${term}"`) :
       this.log(`no subjects matching "${term}"`)),
    catchError(this.handleError<Subject[]>('searchSubjects', []))
  );
}

  private log(message: string) {
    this.messageService.add(`SubjectService: ${message}`);
  }

  private subjectsUrl = 'api/subjects';  // URL to web api

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
