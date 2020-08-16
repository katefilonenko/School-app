import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
 
  subjects: any;
   
  constructor(private subjectsService: SubjectService) {  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(){
    this.subjectsService.getSubjects()
    .subscribe(data=>{
      this.subjects = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }  

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.subjectsService.addSubject({ name } as Subject)
    .subscribe(subject => {
      this.subjects.push(subject);
    });
  }
 
  delete(subject: any): void {
    this.subjects = this.subjects.filter(s => s !== subject);
    this.subjectsService.deleteSubject(subject._id )
    .subscribe();
  }  
}
