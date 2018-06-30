import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBikeComponent } from './insert-bike.component';

describe('InsertBikeComponent', () => {
  let component: InsertBikeComponent;
  let fixture: ComponentFixture<InsertBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
