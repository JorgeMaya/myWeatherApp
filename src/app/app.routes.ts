import { Routes } from '@angular/router';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', title: "My Weather App", component: HomeComponent },
    { path: 'city/:zip', component: CityDetailsComponent}];
