import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../print.service';

@Component({
  selector: 'app-printing-tags-for-roll',
  templateUrl: './printing-tags-for-roll.component.html',
  styleUrls: ['./printing-tags-for-roll.component.scss']
})
export class PrintingTagsForRollComponent implements OnInit {

  constructor(public Service: PrintService) { }

  ngOnInit(): void {
  }

}
