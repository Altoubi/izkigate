import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionItemEditComponent } from './section-item-edit.component';

describe('SectionItemEditComponent', () => {
  let component: SectionItemEditComponent;
  let fixture: ComponentFixture<SectionItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
