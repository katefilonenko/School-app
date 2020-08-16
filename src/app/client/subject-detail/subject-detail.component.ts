import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SubjectService }  from '../subject.service';


@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {
  subject: any;
  subjects: any;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSubject(this.route.snapshot.paramMap.get('id'));
  }

  getSubject(id){
    this.subjectService.getSubject(id)
    .subscribe(subject => this.subject = subject)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.subjectService.updateSubject(this.subject._id, this.subject)
      .subscribe(() => this.goBack());
  }
}

