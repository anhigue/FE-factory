import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueCarsComponent } from './catalogue-cars.component';

describe('CatalogueCarsComponent', () => {
  let component: CatalogueCarsComponent;
  let fixture: ComponentFixture<CatalogueCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
