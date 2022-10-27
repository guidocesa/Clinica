import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesRapidosComponent } from './botones-rapidos.component';

describe('BotonesRapidosComponent', () => {
  let component: BotonesRapidosComponent;
  let fixture: ComponentFixture<BotonesRapidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesRapidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesRapidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
