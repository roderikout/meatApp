import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutDetailEditPage } from './cut-detail-edit.page';

describe('CutDetailEditPage', () => {
  let component: CutDetailEditPage;
  let fixture: ComponentFixture<CutDetailEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutDetailEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutDetailEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
