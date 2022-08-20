import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRollsComponent } from './list-of-rolls.component';

describe('ListOfRollsComponent', () => {
  let component: ListOfRollsComponent;
  let fixture: ComponentFixture<ListOfRollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfRollsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
