import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
//import { MessageService } from '../message.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
 
  subjects: Subject[];
  constructor(private subjectsService: SubjectService) {  }

  ngOnInit(): void {
    this.getSubjects();
  }

    getSubjects(): void {
      this.subjectsService.getSubjects()
          .subscribe(subjects => this.subjects = subjects);
    }

    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      
      this.subjectsService.addSubject({ name } as Subject)
        .subscribe(subject => {
          this.subjects.push(subject);
        });
    }

    delete(subject: Subject): void {
      this.subjects = this.subjects.filter(h => h !== subject);
      this.subjectsService.deleteSubject(subject).subscribe();
    }

    
}
