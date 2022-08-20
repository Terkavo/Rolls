import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollOnListComponent } from './roll-on-list.component';

describe('RollOnListComponent', () => {
  let component: RollOnListComponent;
  let fixture: ComponentFixture<RollOnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollOnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
