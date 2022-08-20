import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportThatRollIsUsedUpComponent } from './report-that-roll-is-used-up.component';

describe('ReportThatRollIsUsedUpComponent', () => {
  let component: ReportThatRollIsUsedUpComponent;
  let fixture: ComponentFixture<ReportThatRollIsUsedUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportThatRollIsUsedUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportThatRollIsUsedUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
