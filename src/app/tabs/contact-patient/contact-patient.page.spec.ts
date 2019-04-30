import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPatientPage } from './contact-patient.page';

describe('ContactPatientPage', () => {
  let component: ContactPatientPage;
  let fixture: ComponentFixture<ContactPatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPatientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
