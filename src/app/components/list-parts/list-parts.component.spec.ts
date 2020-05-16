import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartsComponent } from './list-parts.component';

describe('ListPartsComponent', () => {
  let component: ListPartsComponent;
  let fixture: ComponentFixture<ListPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
