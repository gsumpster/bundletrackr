import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgxFileDropModule } from 'ngx-file-drop';

import { AutoCompleteModule } from '../components/autocomplete/autocomplete.module';
import { ButtonComponent } from '../components/button/button.component';
import { FileDropComponent } from '../components/file-drop/file-drop.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { GitCommitComponent } from '../components/git-commit/git-commit.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { GitComponent } from './git/git.component';
import { LoadingComponent } from './loading/loading.component';
import { ResultsComponent } from './results/results.component';
import { SetupComponent } from './setup.component';
import * as fromSetup from './setup.reducer';
import { SetupService } from './setup.service';
import { UploadComponent } from './upload/upload.component';
import { EffectsModule } from '@ngrx/effects';
import { SetupEffects } from './setup.effects';

@NgModule({
  declarations: [
    SetupComponent,
    GitComponent,
    FormFieldComponent,
    ButtonComponent,
    UploadComponent,
    FileDropComponent,
    GitCommitComponent,
    LoadingComponent,
    ResultsComponent,
    SpinnerComponent,
  ],
  providers: [
    SetupService,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    NgxFileDropModule,
    StoreModule.forFeature(fromSetup.setupFeatureKey, fromSetup.reducer),
    EffectsModule.forFeature([SetupEffects])
  ]
})
export class SetupModule {}
