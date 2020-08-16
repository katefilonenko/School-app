import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  sclass: any;
  sclasses:any;
  message = '';
 
  constructor(
    private route: ActivatedRoute,
    private sclassService: ClassService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getClass(this.route.snapshot.paramMap.get('id'));
  }

  getClass(id){
    this.sclassService.getClass(id)
    .subscribe(sclass => this.sclass = sclass);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.sclassService.updateClass(this.sclass._id, this.sclass)
      .subscribe(() => this.goBack());
  }
}
