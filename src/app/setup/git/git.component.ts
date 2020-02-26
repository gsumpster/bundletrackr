import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, filter, tap, map } from 'rxjs/operators';

import { fetchBranches } from '../setup.actions';
import { SetupState } from '../setup.reducer';
import { SetupService } from '../setup.service';

const URL_REGEX =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

@Component({
  selector: 'bt-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GitComponent implements OnInit {
  public branches$;

  public gitForm = new FormGroup({
    gitUrl: new FormControl('', {validators: Validators.required}),
    // gitUsername: new FormControl(''),
    // gitPassword: new FormControl(''),
    defaultBranch: new FormControl('', {validators: Validators.required}),
  });


  constructor(
    private setupService: SetupService, 
    private router: Router,
    private store: Store<any>
    ) {
      this.branches$ = this.store.pipe(select('setup', 'git', 'branches'));
    }

  public ngOnInit() {
    this.onGitURLChange(this.gitForm.get('gitUrl').valueChanges);
  }

  public submit() {
    if (this.gitForm.valid) {
      this.setupService.saveGitRepo(this.gitForm.value);
      this.router.navigateByUrl('/upload')
    }
  }

  private onGitURLChange(value$) {
    return value$.pipe(
      debounceTime(250),
      filter((url: string) => URL_REGEX.test(url)),
      ).subscribe((url) => {
        this.store.dispatch(fetchBranches({url: url}))
      });
  }
}
