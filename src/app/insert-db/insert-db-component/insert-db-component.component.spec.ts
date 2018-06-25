import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDbComponentComponent } from './insert-db-component.component';

describe('InsertDbComponentComponent', () => {
  let component: InsertDbComponentComponent;
  let fixture: ComponentFixture<InsertDbComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertDbComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDbComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
