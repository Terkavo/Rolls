import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTwoDesignComponent } from './one-two-design.component';

describe('OneTwoDesignComponent', () => {
  let component: OneTwoDesignComponent;
  let fixture: ComponentFixture<OneTwoDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTwoDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTwoDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
