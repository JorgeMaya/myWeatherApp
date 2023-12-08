export interface CityWeather {
    zipCode: string;
    name?: string;
    tempC: number;
    tempF: number;
    icon: string;
    description: string;
    highC: number;
    lowC: number;
    highF: number;
    lowF: number;
    wind: number;
    humidity: number;
    visibility: number;
    date?: string;
}
