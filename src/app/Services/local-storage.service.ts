import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly FAVORITES_KEY = 'favorites';

  getFavorites(): string[] {
    const favoritesJson = localStorage.getItem(this.FAVORITES_KEY);
    if (favoritesJson) {
      return JSON.parse(favoritesJson);
    }
    return [];
  }

  saveFavorites(favorites: string[]): void {
    const favoritesJson = JSON.stringify(favorites);
    localStorage.setItem(this.FAVORITES_KEY, favoritesJson);
  }

  removeFromFavorites(locationKey: string): void {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(locationKey);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }
}
