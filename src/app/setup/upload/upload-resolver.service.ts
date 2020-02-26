import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SetupService } from '../setup.service';

@Injectable()
export class UploadResolver implements Resolve<any> {
    constructor(private setupService: SetupService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.setupService.fetchLatestCommit();
    }
}