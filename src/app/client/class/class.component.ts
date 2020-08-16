import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  sclasses:any;
  
  constructor(private sclassServise: ClassService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(): void{
    this.sclassServise.getClasses()
    .subscribe(sclasses => this.sclasses = sclasses);
  }

  add(num: number, letter: string): void {
    letter = letter.trim();
    if (!letter){return;}
    this.sclassServise.addClass({num, letter}as Class)
    .subscribe(sclass => {
      console.log(sclass)
      this.sclasses.push(sclass);
    });
  }

  delete(sclass: any) {
    this.sclasses = this.sclasses.filter(s => s !== sclass);
    this.sclassServise.deleteClass(sclass._id)
    .subscribe();
  }
  
}
