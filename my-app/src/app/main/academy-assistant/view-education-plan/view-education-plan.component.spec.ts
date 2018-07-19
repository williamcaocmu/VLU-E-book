import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEducationPlanComponent } from './view-education-plan.component';

describe('ViewEducationPlanComponent', () => {
  let component: ViewEducationPlanComponent;
  let fixture: ComponentFixture<ViewEducationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEducationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEducationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
