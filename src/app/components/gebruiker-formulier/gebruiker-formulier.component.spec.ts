import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerFormulierComponent } from './gebruiker-formulier.component';

describe('GebruikerFormulierComponent', () => {
  let component: GebruikerFormulierComponent;
  let fixture: ComponentFixture<GebruikerFormulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GebruikerFormulierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerFormulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
