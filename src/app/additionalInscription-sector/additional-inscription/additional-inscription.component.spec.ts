import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInscriptionComponent } from './additional-inscription.component';

describe('AdditionalInscriptionComponent', () => {
  let component: AdditionalInscriptionComponent;
  let fixture: ComponentFixture<AdditionalInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
