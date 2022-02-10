import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPumpsComponent } from './bar-pumps.component';

describe('BarPumpsComponent', () => {
  let component: BarPumpsComponent;
  let fixture: ComponentFixture<BarPumpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarPumpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
