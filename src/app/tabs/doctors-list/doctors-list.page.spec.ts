import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsListPage } from './doctors-list.page';

describe('DoctorsListPage', () => {
  let component: DoctorsListPage;
  let fixture: ComponentFixture<DoctorsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
