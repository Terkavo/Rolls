import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRollQuantityComponent } from './change-roll-quantity.component';

describe('ChangeRollQuantityComponent', () => {
  let component: ChangeRollQuantityComponent;
  let fixture: ComponentFixture<ChangeRollQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRollQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRollQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
