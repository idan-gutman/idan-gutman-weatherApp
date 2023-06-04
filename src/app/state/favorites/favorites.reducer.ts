import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
const fav = [
  {
    Key: '215854',
    EnglishName: 'Tel Aviv',
    currentWeather: {
      WeatherText: 'SUNY',
      LocalObservationDateTime: '2023-06-02T15:33:00+03:00',
      Temperature: {
        Metric: {
          Value: 37.2,
        },
      },
    },
  },
  {
    Key: '226396',
    EnglishName: 'Tokio',
    currentWeather: {
      WeatherText: 'SUNY',
      LocalObservationDateTime: '2023-06-02T15:33:00+03:00',
      Temperature: {
        Metric: {
          Value: 37.2,
        },
      },
    },
  },
  {
    Key: '215854',
    EnglishName: 'Tel Aviv',
    currentWeather: {
      WeatherText: 'SUNY',
      LocalObservationDateTime: '2023-06-02T15:33:00+03:00',
      Temperature: {
        Metric: {
          Value: 37.2,
        },
      },
    },
  },
  {
    Key: '215854',
    EnglishName: 'Tel Aviv',
    currentWeather: {
      WeatherText: 'SUNY',
      LocalObservationDateTime: '2023-06-02T15:33:00+03:00',
      Temperature: {
        Metric: {
          Value: 37.2,
        },
      },
    },
  },
];
export interface FavoritesState {
  favorites: any[];
}

export const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addToFavorites, (state, { location }) => ({
    ...state,
    favorites: [...state.favorites, location],
  })),
  on(FavoritesActions.removeFromFavorites, (state, { locationKey }) => ({
    ...state,
    favorites: state.favorites.filter(
      (favorite) => favorite.Key !== locationKey
    ),
  }))
);
