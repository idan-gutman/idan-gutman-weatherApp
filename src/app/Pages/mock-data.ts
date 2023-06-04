export const defualtLocation = {
    Version: 1,
    Key: "215854",
    Type: "Location",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
        ID: "IL",
        LocalizedName: "Israel"
    },
    AdministrativeArea: {
        ID: "TA",
        LocalizedName: "Tel Aviv"
    }
}

export const mockCurrentWeather = {
    LocalObservationDateTime: "2023-05-30T14:53:00+03:00",
    EpochTime: 1685447580,
    WeatherText: "Clouds and sun",
    WeatherIcon: 4,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 24.4,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 76,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/2158"
  };
  
  export const mockForecast = {
    DailyForecasts: [
      {
        Date: "2023-05-30T07:00:00+03:00",
        EpochDate: 1685419200,
        Temperature: {
          Minimum: {
            Value: 68,
            Unit: "F",
            UnitType: 18,
          },
          Maximum: {
            Value: 80,
            Unit: "F",
            UnitType: 18,
          },
        },
        Day: {
          Icon: 2,
          IconPhrase: "Mostly sunny",
          HasPrecipitation: false,
        },
        Night: {
          Icon: 33,
          IconPhrase: "Clear",
          HasPrecipitation: false,
        },
        Sources: ["AccuWeather"],
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        Link:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
      },
      {
        Date: "2023-05-31T07:00:00+03:00",
        EpochDate: 1685505600,
        Temperature: {
          Minimum: {
            Value: 67,
            Unit: "F",
            UnitType: 18,
          },
          Maximum: {
            Value: 81,
            Unit: "F",
            UnitType: 18,
          },
        },
        Day: {
          Icon: 1,
          IconPhrase: "Sunny",
          HasPrecipitation: false,
        },
        Night: {
          Icon: 33,
          IconPhrase: "Clear",
          HasPrecipitation: false,
        },
        Sources: ["AccuWeather"],
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
        Link:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
      },
      {
        Date: "2023-06-01T07:00:00+03:00",
        EpochDate: 1685592000,
        Temperature: {
          Minimum: {
            Value: 77,
            Unit: "F",
            UnitType: 18,
          },
          Maximum: {
            Value: 90,
            Unit: "F",
            UnitType: 18,
          },
        },
        Day: {
          Icon: 1,
          IconPhrase: "Sunny",
          HasPrecipitation: false,
        },
        Night: {
          Icon: 38,
          IconPhrase: "Mostly cloudy",
          HasPrecipitation: false,
        },
        Sources: ["AccuWeather"],
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
        Link:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
      },
      {
        Date: "2023-06-02T07:00:00+03:00",
        EpochDate: 1685678400,
        Temperature: {
          Minimum: {
            Value: 77,
            Unit: "F",
            UnitType: 18,
          },
          Maximum: {
            Value: 97,
            Unit: "F",
            UnitType: 18,
          },
        },
        Day: {
          Icon: 30,
          IconPhrase: "Hot",
          HasPrecipitation: false,
        },
        Night: {
          Icon: 34,
          IconPhrase: "Mostly clear",
          HasPrecipitation: false,
        },
        Sources: ["AccuWeather"],
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
        Link:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
      },
      {
        Date: "2023-06-03T07:00:00+03:00",
        EpochDate: 1685764800,
        Temperature: {
          Minimum: {
            Value: 71,
            Unit: "F",
            UnitType: 18,
          },
          Maximum: {
            Value: 85,
            Unit: "F",
            UnitType: 18,
          },
        },
        Day: {
          Icon: 2,
          IconPhrase: "Mostly sunny",
          HasPrecipitation: false,
        },
        Night: {
          Icon: 34,
          IconPhrase: "Mostly clear",
          HasPrecipitation: false,
        },
        Sources: ["AccuWeather"],
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
        Link:
          "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
      },
    ],
  };
  