import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoPage } from './patient-info.page';

describe('PatientInfoPage', () => {
  let component: PatientInfoPage;
  let fixture: ComponentFixture<PatientInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
