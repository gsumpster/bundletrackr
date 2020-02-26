import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as SetupActions from './setup.actions'

export interface GitRepository {
    remote: string
    branches?: string[]
}

export interface SetupState {
    git: GitRepository
}

export const initialState: SetupState = {
    git: {
        remote: '',
        branches: [],
    }
};

const setupReducer = createReducer(
    initialState,
    on(SetupActions.fetchBranches, state => ({...state})),
    on(SetupActions.fetchBranchesSuccess, (state, action) => ({...state, git: { ...state.git, branches: action.branches }})),
    on(SetupActions.fetchBranchesFailure, state => ({...state})),
);

export function reducer(state: SetupState | undefined, action: Action) {
    return setupReducer(state, action);
}

export const setupFeatureKey = 'setup';

export interface AppState {
    setup: SetupState;
}

export const selectFeature = createFeatureSelector<AppState, SetupState>(setupFeatureKey);

export const selectFeatureCount = createSelector(
    selectFeature,
    (state: SetupState) => state.git.branches
);
