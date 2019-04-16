import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPagePage } from './country-page.page';

describe('CountryPagePage', () => {
  let component: CountryPagePage;
  let fixture: ComponentFixture<CountryPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
