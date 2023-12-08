import { WeatherService } from './../../services/weather.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CityWeather } from '../../models/city-weather';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'mwa-city-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})

export class CityListComponent{

  @Input() cities: CityWeather[] = [];
  @Output() zipSearch = new EventEmitter<string>();
  @Output() zipDelete = new EventEmitter<string>();

  unit: boolean = true;
  subscription: Subscription = new Subscription();

  cityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private weatherService: WeatherService) { 
    this.cityForm = this.formBuilder.group({
      zip: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  addCity() {
    if (this.cityForm.valid) {
      this.zipSearch.emit(this.cityForm.value.zip);
      this.cityForm.reset();
    }
  }

  deleteCity(zip: string) {
    this.zipDelete.emit(zip);
  }

  ngOnInit() {
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
