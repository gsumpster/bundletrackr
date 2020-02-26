import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { SetupService } from '../setup.service';
import { NgxFileDropEntry} from 'ngx-file-drop';

@Component({
  selector: 'bt-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public commitSha$ = new ReplaySubject();

  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private setupService: SetupService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.commitSha$.next(data.commit.latest.hash)
    })
  }

  public onFileDropped(files: NgxFileDropEntry[]) {
    const droppedFile = files[0];
    if (droppedFile.fileEntry.isFile) {
      this.setupService.uploadStatsFile(droppedFile).subscribe((success) => {
        if (success) {
          this.zone.run(() => this.router.navigateByUrl('/analyzing'))
        }
      });
    }
  }

}
