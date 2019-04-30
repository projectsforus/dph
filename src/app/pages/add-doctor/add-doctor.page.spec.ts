import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorPage } from './add-doctor.page';

describe('AddDoctorPage', () => {
  let component: AddDoctorPage;
  let fixture: ComponentFixture<AddDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
