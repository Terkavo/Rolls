import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyStorageCellComponent } from './specify-storage-cell.component';

describe('SpecifyStorageCellComponent', () => {
  let component: SpecifyStorageCellComponent;
  let fixture: ComponentFixture<SpecifyStorageCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecifyStorageCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyStorageCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
