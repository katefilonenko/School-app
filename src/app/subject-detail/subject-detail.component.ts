import { Subject } from '../subject';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SubjectService }  from '../subject.service';


@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {
  @Input() subject: Subject;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSubject();
  }
  
  getSubject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subjectService.getSubject(id)
      .subscribe(subject => this.subject = subject);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.subjectService.updateSubject(this.subject)
      .subscribe(() => this.goBack());
  }
}

