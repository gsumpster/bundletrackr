import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { SetupService } from '../setup.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class UploadGuard implements CanActivate {
    constructor(private setupService: SetupService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.setupService.getGitRepo().pipe(
            take(1),
            map((repo) => repo ? true : this.router.parseUrl(''))
        )
    }
}