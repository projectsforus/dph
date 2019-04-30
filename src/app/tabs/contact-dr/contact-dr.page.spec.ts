import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDrPage } from './contact-dr.page';

describe('ContactDrPage', () => {
  let component: ContactDrPage;
  let fixture: ComponentFixture<ContactDrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
