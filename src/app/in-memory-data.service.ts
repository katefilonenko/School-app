import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';
import { Subject } from './subject';
import { Class } from './class';



@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
 
  createDb() {
    const subjects = [
      { id: 1, name: 'Math' },
      { id: 2, name: 'English' },
      { id: 3, name: 'History' },
      { id: 4, name: 'Physics' },
      { id: 5, name: 'Geography' },
      { id: 6, name: 'Russian' },
      { id: 7, name: 'Programming' },
      { id: 8, name: 'Chemistry' },
      { id: 9, name: 'Magma' },
      { id: 10, name: 'Biology' }
    ];

    const sclasses = [
      { num: 1, letter: 'A' },
      { num: 1, letter: 'B' },
      { num: 1, letter: 'C' },
      { num: 2, letter: 'A' },
      { num: 3, letter: 'B' },
      { num: 4, letter: 'C' },
      { num: 5, letter: 'A' }
    ]
    return {subjects, sclasses};
  }

  
  
  

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  //genId(subjects: Subject[]): number {
   // return subjects.length > 0 ? Math.max(...subjects.map(subject => subject.id)) + 1 : 11;
 // }

  //genIdd(sclasses: Class[]): number{
   // return sclasses.length > 0 ? Math.max(...sclasses.map(sclass => sclass.num)) + 1: 11;
  //}

}

