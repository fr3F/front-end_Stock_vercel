import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WeatherData {
  ville: string;
  pays: string;
  timestamp: string;
  temperature: number;
  humidite: number;
  pression: number;
  vent: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getWeatherData(): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(`${this.apiUrl}/weather-data`);
  }

  getHistoricalSvg(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/historical-svg`, { responseType: 'blob' });
  }

  getForecastSvg(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/forecast-svg`, { responseType: 'blob' });
  }

  collectData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/collect-data`, {});
  }

  // stopCollection(): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/stop-collection`, {});
  // }
}
