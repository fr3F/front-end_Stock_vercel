import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandChartComponent } from './demand-chart.component';

describe('DemandChartComponent', () => {
  let component: DemandChartComponent;
  let fixture: ComponentFixture<DemandChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
