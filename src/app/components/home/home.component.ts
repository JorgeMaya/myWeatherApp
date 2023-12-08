import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { CityListComponent } from '../city-list/city-list.component';
import { CommonModule } from '@angular/common';
import { CityWeather } from '../../models/city-weather';

@Component({
  selector: 'mwa-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, CityListComponent],
})
export class HomeComponent implements OnInit {
  cities: CityWeather[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    const zipCodes = ['10001', '94101', '60601'];
    this.weatherService.getInitialWeathers(zipCodes).subscribe({
      next: (weatherData) => {
        this.cities = weatherData.map((data, index) => {
          return this.weatherService.dataToCity(zipCodes[index], data);
        });
      },
      error: (err: any) => {
        alert('Error: ' + err.message);
      },
    });
  }

  addWeather(zip: string) {
    console.log('addWeather', zip);
    const zipCode = parseInt(zip, 10);
    this.weatherService.getWeatherByZip(zip).subscribe((data) => {
      const newCity = this.weatherService.dataToCity(zipCode.toString(), data);
      this.cities.push(newCity);
    });
  }

  deleteCity(zip: string) {
    this.cities.forEach((city: CityWeather) => {
      this.cities = this.cities.filter((data) => {
        return data.zipCode != zip;
      });
    });
  }
}
