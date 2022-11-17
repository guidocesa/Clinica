import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosFinPorMedicoLapsoComponent } from './turnos-fin-por-medico-lapso.component';

describe('TurnosFinPorMedicoLapsoComponent', () => {
  let component: TurnosFinPorMedicoLapsoComponent;
  let fixture: ComponentFixture<TurnosFinPorMedicoLapsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosFinPorMedicoLapsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosFinPorMedicoLapsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
