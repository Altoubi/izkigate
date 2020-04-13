import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersShowComponent } from './orders-show.component';

describe('OrdersShowComponent', () => {
  let component: OrdersShowComponent;
  let fixture: ComponentFixture<OrdersShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
