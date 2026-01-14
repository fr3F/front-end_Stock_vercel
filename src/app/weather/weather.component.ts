import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { WeatherData, WeatherService } from './weather.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  weatherData: WeatherData[] = [];
  historicalSvgUrl: SafeUrl | null = null;
  forecastSvgUrl: SafeUrl | null = null;

  // Chart configuration
  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: 'Temperature (°C)',
        borderColor: 'blue',
        fill: false
      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Temperature (°C)' } }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(private weatherService: WeatherService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadWeatherData();
    this.loadSvgs();
  }

  loadWeatherData() {
    this.weatherService.getWeatherData().subscribe({
      next: (data) => {
        this.weatherData = data;
        // Update chart data
        this.lineChartData.datasets[0].data = data.map((d) => d.temperature);
        this.lineChartData.labels = data.map((d) => new Date(d.timestamp).toLocaleTimeString());
        this.lineChartData = { ...this.lineChartData }; // Trigger change detection
      },
      error: (err) => console.error('Error fetching weather data:', err)
    });
  }

  loadSvgs() {
    this.weatherService.getHistoricalSvg().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.historicalSvgUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => console.error('Error fetching historical SVG:', err)
    });

    this.weatherService.getForecastSvg().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.forecastSvgUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => console.error('Error fetching forecast SVG:', err)
    });
  }

  collectData() {
    this.weatherService.collectData().subscribe({
      next: () => {
        console.log('Data collection triggered');
        this.loadWeatherData();
        this.loadSvgs();
      },
      error: (err) => console.error('Error triggering data collection:', err)
    });
  }
}