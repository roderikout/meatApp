import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutAddPage } from './cut-add.page';

describe('CutAddPage', () => {
  let component: CutAddPage;
  let fixture: ComponentFixture<CutAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
