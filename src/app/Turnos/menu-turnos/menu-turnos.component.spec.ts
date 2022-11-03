import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTurnosComponent } from './menu-turnos.component';

describe('MenuTurnosComponent', () => {
  let component: MenuTurnosComponent;
  let fixture: ComponentFixture<MenuTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
