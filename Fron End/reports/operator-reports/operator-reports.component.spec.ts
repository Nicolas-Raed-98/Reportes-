import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorReportsComponent } from './operator-reports.component';

describe('OperatorReportsComponent', () => {
  let component: OperatorReportsComponent;
  let fixture: ComponentFixture<OperatorReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
