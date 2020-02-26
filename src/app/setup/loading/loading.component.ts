import { Component, OnInit } from '@angular/core';
import { SetupService } from '../setup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public polling$ = this.setupService.pollForChanges();

  constructor(private setupService: SetupService, private router: Router) { }

  ngOnInit() {
    this.polling$.subscribe((response: any) => {
      if (response.status === 'done') {
        this.router.navigateByUrl('/results')
      }
    });
  }

}
