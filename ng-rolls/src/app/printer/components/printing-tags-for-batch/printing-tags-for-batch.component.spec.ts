import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingTagsForBatchComponent } from './printing-tags-for-batch.component';

describe('PrintingTagsForBatchComponent', () => {
  let component: PrintingTagsForBatchComponent;
  let fixture: ComponentFixture<PrintingTagsForBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingTagsForBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingTagsForBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
