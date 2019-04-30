import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChatPage } from './patient-chat.page';

describe('PatientChatPage', () => {
  let component: PatientChatPage;
  let fixture: ComponentFixture<PatientChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
