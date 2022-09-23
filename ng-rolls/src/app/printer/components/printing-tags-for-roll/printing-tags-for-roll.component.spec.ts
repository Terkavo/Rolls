import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingTagsForRollComponent } from './printing-tags-for-roll.component';

describe('PrintingTagsForRollComponent', () => {
  let component: PrintingTagsForRollComponent;
  let fixture: ComponentFixture<PrintingTagsForRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingTagsForRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingTagsForRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
