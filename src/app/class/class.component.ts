import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';
import {CLASSES} from '../mock-class';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  sclasses: Class[];
  //sclasses = CLASSES;
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
      this.sclasses.push(sclass);
    });
  }

  delete(sclass: Class, sclass1: Class): void {
    this.sclasses = this.sclasses.filter(s => s !== sclass);
    this.sclassServise.deleteClass(sclass, sclass1).subscribe();
  }

}
