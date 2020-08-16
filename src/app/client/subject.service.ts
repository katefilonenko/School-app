import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const subjectsUrl = 'http://localhost:8080/school/subjects';  // URL to web api

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
constructor(private http: HttpClient) { }

  getSubjects(){
    return this.http.get(subjectsUrl)
  }
  
  getSubject(id){
    const url = `${subjectsUrl}/${id}`;
    return this.http.get(url)
  }

  updateSubject(id, data){
    const url = `${subjectsUrl}/${id}`
    return this.http.put(url, data);
  }

  addSubject(data) {
    return this.http.post(subjectsUrl, data);
  }

  deleteSubject(id){
    const url = `${subjectsUrl}/${id}`
    return this.http.delete(url);
  }
}
