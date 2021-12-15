import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnProductComponent } from './mijn-product.component';

describe('MijnProductComponent', () => {
  let component: MijnProductComponent;
  let fixture: ComponentFixture<MijnProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MijnProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
