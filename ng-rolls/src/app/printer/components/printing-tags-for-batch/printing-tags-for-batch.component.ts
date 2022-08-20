import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../print.service';

@Component({
  selector: 'app-printing-tags-for-batch',
  templateUrl: './printing-tags-for-batch.component.html',
  styleUrls: ['./printing-tags-for-batch.component.scss']
})
export class PrintingTagsForBatchComponent implements OnInit {

  constructor(public Service:PrintService) { }

  ngOnInit(): void {
  }

}
