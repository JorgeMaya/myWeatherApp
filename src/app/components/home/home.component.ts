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
  zipCodes: string[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if (!localStorage.getItem('zipCodes')) {
      localStorage.setItem('zipCodes', JSON.stringify(['10001', '94101', '60601']));
    } else {
      this.zipCodes = JSON.parse(localStorage.getItem('zipCodes') ?? '[]');
    }
    this.getInitialData();
  }

  getInitialData() {
    console.log('getInitialData', this.zipCodes);
    this.weatherService.getInitialWeathers(this.zipCodes).subscribe({
      next: (weatherData) => {
        this.cities = weatherData.map((data, index) => {
          return this.weatherService.dataToCity(this.zipCodes[index], data);
        });
      },
      error: (err: any) => {
        alert('Error: ' + err.message);
      },
    });
  }

  addWeather(zip: string) {
    this.weatherService.getWeatherByZip(zip).subscribe({
      next: (data) => {
        this.cities.push(this.weatherService.dataToCity(zip, data));
      },
      complete: () => {
        this.zipCodes.push(zip);
        localStorage.setItem('zipCodes', JSON.stringify(this.zipCodes));
      }
    });
  }

  deleteCity(zip: string) {
    this.zipCodes = this.zipCodes.filter((data) => {
      return data != zip;
    });
    localStorage.setItem('zipCodes', JSON.stringify(this.zipCodes));
      this.cities = this.cities.filter((data) => {
        return data.zipCode != zip;
      });
  }
}
