import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMedicationPage } from './my-medication.page';

describe('MyMedicationPage', () => {
  let component: MyMedicationPage;
  let fixture: ComponentFixture<MyMedicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMedicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMedicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
