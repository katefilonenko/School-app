import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const  sclassesUrl = 'http://localhost:8080/school/classes';  // URL to web api  

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

 
  getClasses(){
    return this.http.get(sclassesUrl)
  }

  getClass(id){
    const url = `${sclassesUrl}/${id}`;
    return this.http.get(url)
  }

  addClass(data) {
    return this.http.post(sclassesUrl, data)
  }

  updateClass(id, data) {
    const url = `${sclassesUrl}/${id}`
    return this.http.put(url, data)
  }

  deleteClass(id){        
    return this.http.delete(`${sclassesUrl}/${id}`)
  } 
}
