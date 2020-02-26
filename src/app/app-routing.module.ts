import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup/setup.component';
import { GitComponent } from './setup/git/git.component';
import { UploadComponent } from './setup/upload/upload.component';
import { UploadResolver } from './setup/upload/upload-resolver.service';
import { UploadGuard } from './setup/upload/upload.guard';
import { LoadingComponent } from './setup/loading/loading.component';
import { ResultsComponent } from './setup/results/results.component';


const routes: Routes = [{
  path: '',
  component: SetupComponent,
  children: [
    {
      path: '',
      component: GitComponent
    },
    {
      path: 'upload',
      component: UploadComponent,
      canActivate: [UploadGuard],
      resolve: {
        commit: UploadResolver
      }
    },
    {
      path: 'analyzing',
      component: LoadingComponent,
      canActivate: [UploadGuard],
    },
    {
      path: 'results',
      component: ResultsComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
