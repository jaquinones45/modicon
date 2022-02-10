import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarNumComponent } from './var-num.component';

describe('VarNumComponent', () => {
  let component: VarNumComponent;
  let fixture: ComponentFixture<VarNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarNumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
