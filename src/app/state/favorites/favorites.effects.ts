import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../Services/local-storage.service';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {
    loadFavoritesFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavoritesFromStorage),
      switchMap(() => {
        const favorites = this.localStorageService.getFavorites();
        return of(FavoritesActions.loadFavorites({ favorites }));
      })
    )
  );
  addFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.addToFavorites),
        tap((action) => {
          const favorites = this.localStorageService.getFavorites();
          const updatedFavorites = [...favorites, action.location];
          this.localStorageService.saveFavorites(updatedFavorites);
        })
      ),
    { dispatch: false }
  );

  removeFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.removeFromFavorites),
        tap((action) => {
          const favorites = this.localStorageService.getFavorites();
          const updatedFavorites = favorites.filter((key) => key !== action.locationKey);
          this.localStorageService.saveFavorites(updatedFavorites);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}
}
