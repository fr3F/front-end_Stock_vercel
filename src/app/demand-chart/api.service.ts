import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prediction {
  Product: string;
  Depot: string;
  Date: string;
  Forecasted_Quantity: number;
  Forecast?: string;
}

export interface Product {
  id_p: number;
  designation_p: string;
}

export interface Depot {
  id_dep: number;
  nom_dep: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getPredictions(id_p: number, id_dep: number, forecast_days: number = 7): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.apiUrl}/forecast?id_p=${id_p}&id_dep=${id_dep}&forecast_days=${forecast_days}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getDepots(): Observable<Depot[]> {
    return this.http.get<Depot[]>(`${this.apiUrl}/depots`);
  }
}
