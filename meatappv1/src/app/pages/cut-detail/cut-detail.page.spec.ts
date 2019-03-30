import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutDetailPage } from './cut-detail.page';

describe('CutDetailPage', () => {
  let component: CutDetailPage;
  let fixture: ComponentFixture<CutDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
