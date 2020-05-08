import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStoreComponent } from './report-store.component';

describe('ReportStoreComponent', () => {
  let component: ReportStoreComponent;
  let fixture: ComponentFixture<ReportStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
