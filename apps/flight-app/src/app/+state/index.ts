import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {

}

export const reducers: ActionReducerMap<State> = {

};

// Insert
export function debugMetaReducer(reducer: ActionReducer<any>): 
  ActionReducer<any> {
  
    return function(state, action) {
    console.log('before: state', state);
    console.log('before: action', action);
 
    const result = reducer(state, action);

    console.log('after: state', state);
    console.log('after: action', action);

    return result;

  };
}

// Modify
export const metaReducers: MetaReducer<State>[] = 
  !environment.production ? 
    [debugMetaReducer] : 
    [];
