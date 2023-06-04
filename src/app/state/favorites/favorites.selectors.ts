import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorites.reducer';

export const selectFavoritesState = createFeatureSelector<fromFavorites.FavoritesState>('favorites');

export const selectFavorites = createSelector(
  selectFavoritesState,
  (state: fromFavorites.FavoritesState) => state.favorites
);
