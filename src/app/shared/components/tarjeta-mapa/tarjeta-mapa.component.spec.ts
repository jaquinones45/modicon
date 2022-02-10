import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaMapaComponent } from './tarjeta-mapa.component';

describe('TarjetaMapaComponent', () => {
  let component: TarjetaMapaComponent;
  let fixture: ComponentFixture<TarjetaMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
