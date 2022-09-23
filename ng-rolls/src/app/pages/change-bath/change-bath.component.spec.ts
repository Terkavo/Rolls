import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBathComponent } from './change-bath.component';

describe('ChangeBathComponent', () => {
  let component: ChangeBathComponent;
  let fixture: ComponentFixture<ChangeBathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
