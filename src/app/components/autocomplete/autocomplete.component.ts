import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bt-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutoCompleteComponent {

  @Input()
  public control: FormControl;

  @Input()
  public data: string[];

  @Input()
  public placeholder: string;

  @Input()
  public isLoading: boolean;

  public keyword = '-';

}
