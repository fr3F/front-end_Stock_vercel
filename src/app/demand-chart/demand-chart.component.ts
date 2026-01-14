import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService, Prediction, Product, Depot } from './api.service';

@Component({
  selector: 'app-demand-chart',
  templateUrl: './demand-chart.component.html',
  styleUrls: ['./demand-chart.component.css']
})
export class DemandChartComponent implements OnInit {
  predictions: Prediction[] = [];
  products: Product[] = [];
  depots: Depot[] = [];
  selectedProduct: number | null = null;
  selectedDepot: number | null = null;
  forecastDays: number = 7;
  loading = true;
  error: string | null = null;

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Quantité prévue' } }
    }
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.selectedProduct = products[0]?.id_p || null;

        this.api.getDepots().subscribe({
          next: (depots) => {
            this.depots = depots;
            this.selectedDepot = depots[0]?.id_dep || null;

            this.fetchPredictions();
          },
          error: (err) => this.error = err.message
        });
      },
      error: (err) => this.error = err.message
    });
  }

  fetchPredictions() {
    if (this.selectedProduct && this.selectedDepot && this.forecastDays > 0) {
      this.loading = true;
      this.api.getPredictions(this.selectedProduct, this.selectedDepot, this.forecastDays).subscribe({
        next: (data) => {
          this.predictions = data;

          // Mise à jour complète pour déclencher le rafraîchissement du graphique
          this.lineChartData = {
            labels: data.map(p => p.Date),
            datasets: [
              {
                data: data.map(p => p.Forecasted_Quantity),
                label: 'Prévision de stock',
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.3)',
                fill: true,
                tension: 0.3
              }
            ]
          };

          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
    } else {
      this.error = 'Veuillez sélectionner un produit, un dépôt, et un nombre de jours valide.';
    }
  }

  updateForecastDays(days: number) {
    if (days > 0 && days <= 30) {
      this.forecastDays = days;
      this.fetchPredictions();
    } else {
      this.error = 'Le nombre de jours doit être entre 1 et 30.';
    }
  }
}
