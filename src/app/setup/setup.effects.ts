import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, exhaustMap, flatMap } from "rxjs/operators";
import { SetupService } from "./setup.service";
import * as SetupActions from "./setup.actions";

@Injectable()
export class SetupEffects {
  fetchBranches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetupActions.fetchBranches),
      flatMap(action =>
        this.setupService.fetchBranches(action.url).pipe(
          flatMap(branches => of(SetupActions.fetchBranchesSuccess({ branches }))),
          // catchError(error => of(SetupActions.fetchBranchesFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private setupService: SetupService) {}
}
