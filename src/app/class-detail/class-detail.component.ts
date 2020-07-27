import { Component, OnInit, Input } from '@angular/core';
import { Class } from '../class';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  @Input() sclass: Class;

  constructor(
    private route: ActivatedRoute,
    private sclassService: ClassService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getClass();
  }

  getClass(): void{
    const num = +this.route.snapshot.paramMap.get('num');
    const letter = this.route.snapshot.paramMap.get('letter');
    //const num = +this.route.snapshot.params.num;
    //const letter = this.route.snapshot.params.letter;
    this.sclassService.getClass(num,letter)
    .subscribe(sclass => this.sclass = sclass);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.sclassService.updateClass(this.sclass)
      .subscribe(() => this.goBack());
  }


}
