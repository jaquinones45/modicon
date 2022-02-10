import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleBarDifferenceComponent } from './scale-bar-difference.component';

describe('ScaleBarDifferenceComponent', () => {
  let component: ScaleBarDifferenceComponent;
  let fixture: ComponentFixture<ScaleBarDifferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleBarDifferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleBarDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
