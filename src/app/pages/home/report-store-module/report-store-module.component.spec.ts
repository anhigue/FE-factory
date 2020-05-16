import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStoreModuleComponent } from './report-store-module.component';

describe('ReportStoreModuleComponent', () => {
  let component: ReportStoreModuleComponent;
  let fixture: ComponentFixture<ReportStoreModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStoreModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStoreModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
