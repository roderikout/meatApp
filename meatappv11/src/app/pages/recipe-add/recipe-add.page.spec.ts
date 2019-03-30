import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAddPage } from './recipe-add.page';

describe('RecipeAddPage', () => {
  let component: RecipeAddPage;
  let fixture: ComponentFixture<RecipeAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
