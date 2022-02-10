import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvGeneralComponent } from './conv-general.component';

describe('ConvGeneralComponent', () => {
  let component: ConvGeneralComponent;
  let fixture: ComponentFixture<ConvGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
