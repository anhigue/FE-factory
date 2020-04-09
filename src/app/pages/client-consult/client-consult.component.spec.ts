import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConsultComponent } from './client-consult.component';

describe('ClientConsultComponent', () => {
  let component: ClientConsultComponent;
  let fixture: ComponentFixture<ClientConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
