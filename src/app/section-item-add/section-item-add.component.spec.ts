import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionItemAddComponent } from './section-item-add.component';

describe('SectionItemAddComponent', () => {
  let component: SectionItemAddComponent;
  let fixture: ComponentFixture<SectionItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
