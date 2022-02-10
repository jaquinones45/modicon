import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendBepComponent } from './trend-bep.component';

describe('TrendBepComponent', () => {
  let component: TrendBepComponent;
  let fixture: ComponentFixture<TrendBepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendBepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendBepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
