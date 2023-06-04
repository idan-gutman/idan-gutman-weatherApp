import { createAction, props } from '@ngrx/store';

export const addToFavorites = createAction(
  '[Favorites] Add To Favorites',
  props<{ location: any }>()
);
export const removeFromFavorites = createAction(
  '[Favorites] Remove From Favorites',
  props<{ locationKey: string }>()
);
export const loadFavoritesFromStorage = createAction(
  '[Favorites] Load Favorites from Storage'
);

export const loadFavorites = createAction(
  '[Favorites] Load Favorites',
  props<{ favorites: any }>()
);
