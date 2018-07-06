import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrenotationComponent } from './view-prenotation.component';

describe('ViewPrenotationComponent', () => {
  let component: ViewPrenotationComponent;
  let fixture: ComponentFixture<ViewPrenotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrenotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrenotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
