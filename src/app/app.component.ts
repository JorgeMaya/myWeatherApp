import { CityListComponent } from './components/city-list/city-list.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'mwa-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    HomeComponent,
    CityListComponent,
    CityDetailsComponent,
    RouterModule,
  ],
})
export class AppComponent {
  title = 'myWeatherApp';

  celsius: boolean;
  

  constructor(private weatherService: WeatherService) {
    this.celsius = true;
  }

  changeToCelsius() {
    this.weatherService.toggleTempUnit(true);
    this.celsius = true;
  }

  changeToFahrenheit() {
    this.weatherService.toggleTempUnit(false);
    this.celsius = false;
  }

}
