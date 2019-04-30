import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicationPage } from './add-medication.page';

describe('AddMedicationPage', () => {
  let component: AddMedicationPage;
  let fixture: ComponentFixture<AddMedicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
