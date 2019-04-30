import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDrPage } from './login-dr.page';

describe('LoginDrPage', () => {
  let component: LoginDrPage;
  let fixture: ComponentFixture<LoginDrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
