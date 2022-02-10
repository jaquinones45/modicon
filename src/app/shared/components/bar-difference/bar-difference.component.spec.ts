import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDifferenceComponent } from './bar-difference.component';

describe('BarDifferenceComponent', () => {
  let component: BarDifferenceComponent;
  let fixture: ComponentFixture<BarDifferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDifferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
