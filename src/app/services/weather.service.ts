import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { CurrentWeather } from '../models/currentWeather';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Forecast } from '../models/forecast';
import { CityWeather } from '../models/city-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  WEATHER_URL: string = `https://api.openweathermap.org/data/2.5/weather?zip=`;
  FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?zip=`;
  weatherAppKey: string = `3fb2ebb667c71ae72f55106e9ddd29b1`;

  constructor(private http: HttpClient) {}

  getWeatherByZip(zip: string): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeather>(
        `${this.WEATHER_URL}${zip},us&appid=${this.weatherAppKey}&units=metric`
      )
      .pipe(map((data) => data));
  }

  getForecastByZip(zip: string): Observable<Forecast> {
    return this.http
      .get<Forecast>(
        `${this.FORECAST_URL}${zip},us&cnt=5&appid=${this.weatherAppKey}&units=metric`
      )
      .pipe(map((data) => data));
  }

  getInitialWeathers(zips: string[]): Observable<CurrentWeather[]> {
    const citiesWeatherReq = zips.map((zip) => this.getWeatherByZip(zip));
    return forkJoin(citiesWeatherReq);
  }

  dataToCity(zipCode: string, data: CurrentWeather): CityWeather {
    return {
      zipCode: zipCode,
      name: data.name,
      tempF: this.convertCtoF(data.main.temp),
      tempC: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      highF: this.convertCtoF(data.main.temp_max),
      highC: data.main.temp_max,
      lowF: this.convertCtoF(data.main.temp_min),
      lowC: data.main.temp_min,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      visibility: data.visibility,
    };
  }

  forecastToCityWeather(zipCode: string,
    tempC: number,
    icon: string,
    description: string,
    highC: number,
    lowC: number,
    wind: number,
    humidity: number,
    visibility: number,
    name?: string,
    date?: string,): CityWeather{
      return {
        zipCode: zipCode,
        name: name,
        tempF: this.convertCtoF(tempC),
        tempC: tempC,
        icon: icon,
        description: description,
        highF: this.convertCtoF(highC),
        highC: highC,
        lowF: this.convertCtoF(lowC),
        lowC: lowC,
        wind: wind,
        humidity: humidity,
        visibility: visibility,
        date: date
      };
  }

  convertCtoF(tempC: number): number {
    return parseFloat(((tempC * 9) / 5 + 32).toFixed(2));
  }

  private celsius = true;
  private celsiusSelected = new BehaviorSubject<boolean>(this.celsius);

  getTempUnit(): Observable<boolean> {
    return this.celsiusSelected.asObservable();
  }

  toggleTempUnit(celsiusSelected: boolean): void {
    this.celsiusSelected.next(celsiusSelected);
  }
}
