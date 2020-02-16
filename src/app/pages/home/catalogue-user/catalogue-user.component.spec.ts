import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueUserComponent } from './catalogue-user.component';

describe('CatalogueUserComponent', () => {
  let component: CatalogueUserComponent;
  let fixture: ComponentFixture<CatalogueUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
