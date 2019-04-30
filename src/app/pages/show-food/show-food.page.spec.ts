import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFoodPage } from './show-food.page';

describe('ShowFoodPage', () => {
  let component: ShowFoodPage;
  let fixture: ComponentFixture<ShowFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
