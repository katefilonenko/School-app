import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Class } from '../class';
import { ClassService } from '../class.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  subjects: Subject[] = [];
  sclasses: Class[] = [];

  constructor(private subjectSurvice: SubjectService,
              private sclassServise: ClassService) { }

  ngOnInit() {
    this.getSubjects();
    this.getClasses();
  }

  getSubjects(): void {
    this.subjectSurvice.getSubjects()
      .subscribe(subjects => this.subjects = subjects.slice(0, 6));
  }

  getClasses(): void {
    this.sclassServise.getClasses()
    .subscribe(sclasses => this.sclasses = sclasses.slice(0, 6));
  }
}