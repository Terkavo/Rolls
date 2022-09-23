import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBathComponent } from './create-bath.component';

describe('CreateBathComponent', () => {
  let component: CreateBathComponent;
  let fixture: ComponentFixture<CreateBathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
