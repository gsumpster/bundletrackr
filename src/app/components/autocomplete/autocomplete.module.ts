import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteComponent } from './autocomplete.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  exports: [
    AutoCompleteComponent
  ]
})
export class AutoCompleteModule { }
