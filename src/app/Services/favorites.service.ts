import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavorites, removeFromFavorites } from '../state/favorites/favorites.actions';
import { AppState } from '../state/app.state';
import * as fromFavorites from '../state/favorites/favorites.selectors';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites$ = this.store.select(fromFavorites.selectFavorites);

  constructor(private store: Store<AppState>) {}

  addToFavorites(location: any) {
    this.store.dispatch(addToFavorites({ location }));
  }

  removeFromFavorites(locationKey: string) {
    this.store.dispatch(removeFromFavorites({ locationKey }));
  }
}
