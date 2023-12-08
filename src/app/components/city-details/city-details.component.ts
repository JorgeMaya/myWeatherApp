import { CityWeather } from './../../models/city-weather';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mwa-city-details',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css',
})
export class CityDetailsComponent {
  zip: string = '';
  forecast: CityWeather[] = [];
  weatherTemp = {};
  unit: boolean = true;
  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.zip = params['zip'];
    });

    this.weatherService.getForecastByZip(this.zip).subscribe((data) => {
      const city: string = data.city.name;
      data.list.forEach((data) => {
        this.forecast.push(
          this.weatherService.forecastToCityWeather(
            this.zip,
            data.main.temp,
            data.weather[0].icon,
            data.weather[0].description,
            data.main.temp_max,
            data.main.temp_min,
            data.wind.speed,
            data.main.humidity,
            data.visibility,
            city,
            data.dt_txt.toString()
          )
        );
      });
    });

    this.subscription = this.weatherService.getTempUnit().subscribe({
      next: (res: any) => {
        this.unit = res;
      },
      error: (err: any) => {
        console.error(`An error occurred: ${err.message}`);
      }
    });
  }
}
