import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/Services/weather.service';
import { defualtLocation } from '../mock-data';
import { FavoritesService } from 'src/app/Services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/models';
import { Store } from '@ngrx/store';
import * as fromApp from '../../state/app/app.selectors';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { changeTemperatureUnits } from '../../state/app/app.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';

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
    private store: Store<any>,
    public dialog: MatDialog
  ) {}

  searchQuery = new FormControl();
  searchResults: any[] | null = null;
  loading: boolean = false;
  weatherDataloading: boolean = false;
  selectedLocation: any = defualtLocation;
  weatherData: any;
  favorites: any[] = [];
  locationKey: string = '';
  telAvivLocationKey = '215854';
  temperatureUnits$ = this.store.select(fromApp.temperatureUnits);
  showNonEnglishMessage = false;
  errorMessage: string | null = null;
  locationSelectedError: string | null = null;
  fetchWeatherDataError: string | null = null;

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
          this.errorMessage = error.message;
          this.loading = false;
        }
      );
  }

  getLocationDetails(locationKey: string) {
    this.fetchWeatherData(locationKey);
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
        this.openDialog(error.message);
        this.locationSelectedError = error.message;
      }
    );
  }

  fetchWeatherData(locationKey: string) {
    this.weatherDataloading = true;
    forkJoin([
      this.weatherService.getCurrentWeather(locationKey),
      this.weatherService.getFiveDayForecast(locationKey),
      this.weatherService.getLocationByKey(locationKey),
    ])
      .subscribe(
        ([currentWeather, forecast, location]) => {
          this.weatherData = {
            currentWeather: currentWeather[0],
            forecast: forecast.DailyForecasts,
            location,
          };
        },
        (error) => {
          this.openDialog(error.message);
          this.fetchWeatherDataError = error.message;
        }
      )
      .add(() => {
        this.weatherDataloading = false;
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
  openDialog(errorMessage: string) {
    this.dialog.open(DialogComponent, {
      data: {
        errorMessage,
      },
    });
  }
}
