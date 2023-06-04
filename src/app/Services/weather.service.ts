import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Location } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'qsnB5QqSeIkrgrRI36aARoA0OsLlU7g1';
  private baseUrl = 'https://dataservice.accuweather.com/';

  constructor(private http: HttpClient) {}

  getLocationAutocomplete(query: string): Observable<any> {
    const endpoint = `locations/v1/cities/autocomplete`;
    const params = `?apikey=${this.apiKey}&q=${query}`;
    const url = `${this.baseUrl}${endpoint}${params}`;
    return this.http.get(url);
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getFiveDayForecast(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  getLocationByKey(locationKey: string): Observable<Location> {
    const url = `${this.baseUrl}/locations/v1/${locationKey}?apikey=${this.apiKey}`;
    return this.http.get<Location>(url);
  }

  getLocationKeyByCoordinates(
    latitude: number,
    longitude: number
  ): Observable<string> {
    const url = `${this.baseUrl}/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude},${longitude}`;
    return this.http.get<any>(url).pipe(map((response) => response.Key));
  }
}
