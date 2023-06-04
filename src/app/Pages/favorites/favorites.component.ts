import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/Services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });
  }
    removeFromFavorites(locationKey: any) {
    this.favoritesService.removeFromFavorites(locationKey);
  }

  navigateToLocation(locationKey: string) {
    this.router.navigate(['home'], { queryParams: { locationKey } });
  }
  setIcon(icon: number) {
    return icon < 10 ? `0${icon}` : icon;
  }
}

