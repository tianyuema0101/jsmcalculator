import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInscriptionProfileComponent } from './additional-inscription-profile.component';

describe('AdditionalInscriptionProfileComponent', () => {
  let component: AdditionalInscriptionProfileComponent;
  let fixture: ComponentFixture<AdditionalInscriptionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInscriptionProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInscriptionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
