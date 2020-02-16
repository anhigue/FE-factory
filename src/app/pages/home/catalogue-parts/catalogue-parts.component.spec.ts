import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePartsComponent } from './catalogue-parts.component';

describe('CataloguePartsComponent', () => {
  let component: CataloguePartsComponent;
  let fixture: ComponentFixture<CataloguePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CataloguePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CataloguePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
