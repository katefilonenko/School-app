import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule} from '@angular/material/badge';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule
]


@NgModule({
  //declarations: [],
  imports: [
    //CommonModule
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

