import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'bt-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit {

  @Input()
  public label;

  constructor() { }

  ngOnInit() {
  }

}
