import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCounterpartiesComponent } from './list-of-counterparties.component';

describe('ListOfCounterpartiesComponent', () => {
  let component: ListOfCounterpartiesComponent;
  let fixture: ComponentFixture<ListOfCounterpartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCounterpartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCounterpartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
