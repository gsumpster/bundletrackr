import { createAction, props } from "@ngrx/store";

export const fetchBranches = createAction(
  "[Setup - Git] Fetch Branches",
  props<{ url: string }>()
);

export const fetchBranchesSuccess = createAction(
  "[Setup - Git] Fetch Branches Success",
  props<{ branches: any }>()
);

export const fetchBranchesFailure = createAction(
  "[Setup - Git] Fetch Branches Failure",
  props<{ error: any }>()
);
