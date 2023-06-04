import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin,EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/Services/weather.service';
import {
  mockCurrentWeather,
  mockForecast,
  defualtLocation,
} from '../mock-data';
import { FavoritesService } from 'src/app/Services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/models';
import { Store } from '@ngrx/store';
import * as fromApp from '../../state/app/app.selectors';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { changeTemperatureUnits } from '../../state/app/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: ActivatedRoute,
    private store: Store<any>,
    ) {}
    
    searchQuery = new FormControl();
    searchResults: any[] | null = null;
    loading: boolean = false;
    selectedLocation: any = defualtLocation;
    weatherData: any;
    favorites: any[] = [];
    locationKey: string = '';
    telAvivLocationKey = '215854';
    temperatureUnits$ = this.store.select(fromApp.temperatureUnits);
    showNonEnglishMessage = false;

  ngOnInit() {
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });

    this.route.queryParams.subscribe((params) => {
      this.locationKey = params['locationKey'];
      if (this.locationKey) {
        this.getLocationDetails(this.locationKey);
      } else {
        this.getLocationDetails(this.telAvivLocationKey);
      }
    });

    //serching
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((query) => {
          this.showNonEnglishMessage = !this.isEnglishInput(query);
          if (this.showNonEnglishMessage) {
            this.searchResults = null;
            return EMPTY; 
          } else {
            return this.weatherService.getLocationAutocomplete(query); 
          }
        })
      )
      .subscribe(
        (results) => {
          this.searchResults = results;
          this.loading = false;
        },
        (error) => {
          console.log('Error fetching search suggestions:', error);
          this.loading = false;
        }
      );
  }

  getLocationDetails(locationKey: string) {
    this.fetchWeatherData(locationKey)
  }

  onLocationSelected(location: Location) {
    this.selectedLocation = location;
    forkJoin([
      this.weatherService.getCurrentWeather(location.Key),
      this.weatherService.getFiveDayForecast(location.Key),
      this.weatherService.getLocationByKey(location.Key),
    ]).subscribe(
      ([currentWeather, forecast, location]) => {
        this.weatherData = {
          currentWeather: currentWeather[0],
          forecast: forecast.DailyForecasts,
          location,
        };
        this.searchResults = null;
      },
      (error) => {
        console.log('Error fetching weather data:', error);
      }
    );

  }

  fetchWeatherData(locationKey: string) {
    forkJoin([
      this.weatherService.getCurrentWeather(locationKey),
      this.weatherService.getFiveDayForecast(locationKey),
      this.weatherService.getLocationByKey(locationKey),
    ]).subscribe(([currentWeather, forecast, location]) => {
      this.weatherData = {
        currentWeather: currentWeather[0],
        forecast: forecast.DailyForecasts,
        location,
      };
    });
  }

  addToFavorites(location: any) {
    this.favoritesService.addToFavorites(location);
  }

  removeFromFavorites(locationKey: any) {
    this.favoritesService.removeFromFavorites(locationKey);
  }

  setIcon(icon: number) {
    return icon < 10 ? `0${icon}` : icon;
  }

  isFavorite(locationKey: string): boolean {
    return this.favorites.some((favorite) => favorite.Key === locationKey);
  }

  unitChange(event: MatButtonToggleChange) {
    this.store.dispatch(changeTemperatureUnits({ unit: event.value }));
  }

  toggleFavorite(location: any) {
    if (this.isFavorite(location.Key)) {
      this.removeFromFavorites(location.Key);
    } else {
      this.addToFavorites({
        currentWeather: this.weatherData?.currentWeather,
        ...this.weatherData?.location,
      });
    }
  }
  isEnglishInput(inputText: string): boolean {
    const englishRegex = /^[a-zA-Z\s]*$/;
    return englishRegex.test(inputText);
  }
}
