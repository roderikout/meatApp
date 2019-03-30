import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesListPage } from './recipes-list.page';

describe('RecipesListPage', () => {
  let component: RecipesListPage;
  let fixture: ComponentFixture<RecipesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
