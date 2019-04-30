import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOptionsPage } from './login-options.page';

describe('LoginOptionsPage', () => {
  let component: LoginOptionsPage;
  let fixture: ComponentFixture<LoginOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
