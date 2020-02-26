import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { BehaviorSubject, bindCallback, interval, of } from 'rxjs';
import { catchError, exhaustMap, filter, flatMap, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class SetupService {
  private gitRepo$ = new BehaviorSubject(undefined);
  private statToken$ = new BehaviorSubject(undefined);
  private stats$ = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {}

  public getGitRepo() {
    return this.gitRepo$.asObservable();
  }

  public saveGitRepo(git) {
    this.gitRepo$.next(git);
  }

  public pollForChanges() {
    return interval(500).pipe(
      flatMap(() => this.statToken$),
      exhaustMap((token) => this.http.get(`/api/stats/job/${token}`)),
      filter((response:any) => response.status !== 'processing'),
      take(1),
      tap((response) => this.stats$.next(response))
    )
  }

  public fetchLatestCommit() {
      return this.gitRepo$.pipe(
          take(1),
          switchMap((repo: any) => this.http.post("/api/git/current_commit", { url: repo.gitUrl, branch: repo.defaultBranch})),
      )
  }

  public fetchBranches(value) {
    return this.http.post("/api/git/branches", { url: value });
  }

  public uploadStatsFile(fileToUpload: NgxFileDropEntry) {
    const fileEntry = fileToUpload.fileEntry as FileSystemFileEntry;
    const file$ = bindCallback(fileEntry.file);
    return file$.call(fileEntry).pipe(
      take(1),
      map((file: File) => {
        const formData = new FormData();
        formData.append('statsFile', file, 'stats.json');
        return formData;
      }),
      flatMap((formData: FormData) => this.http.post('api/stats/upload', formData)),
      map((response: any) => {
        if (response.token) {
          this.statToken$.next(response.token);
          return true;
        } else {
          return false;
        }
      })
    )
  }
}
