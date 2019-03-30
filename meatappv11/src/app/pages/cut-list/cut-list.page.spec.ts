import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutListPage } from './cut-list.page';

describe('CutListPage', () => {
  let component: CutListPage;
  let fixture: ComponentFixture<CutListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
