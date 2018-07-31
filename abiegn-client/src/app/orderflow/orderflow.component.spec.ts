import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderflowComponent } from './orderflow.component';

describe('OrderflowComponent', () => {
  let component: OrderflowComponent;
  let fixture: ComponentFixture<OrderflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
