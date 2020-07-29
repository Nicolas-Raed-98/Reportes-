import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursionsReportsComponent } from './excursions-reports.component';

describe('ExcursionsReportsComponent', () => {
  let component: ExcursionsReportsComponent;
  let fixture: ComponentFixture<ExcursionsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcursionsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcursionsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
