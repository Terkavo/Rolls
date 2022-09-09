import { Component, OnInit } from '@angular/core';
import { AutonomousRoll, BatchOfRolls } from 'src/app/pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';
import { PrintService } from '../../print.service';

@Component({
  selector: 'app-printing-tags-for-batch',
  templateUrl: './printing-tags-for-batch.component.html',
  styleUrls: ['./printing-tags-for-batch.component.scss']
})
export class PrintingTagsForBatchComponent implements OnInit {
  constructor(public Service: PrintService) { }
  Lists: ListTagsForBatch[]=new Array()
  ngOnInit(): void {
    let list = new ListTagsForBatch()
    this.Service.Batches.forEach(x => {
      x.GetAutonomousRoll().forEach(roll => {
        if (list.Rolls.length >= 12) {
          this.Lists.push(list)
          list = new ListTagsForBatch()
        }
        list.Rolls.push(roll);
      })
    })
    this.Lists.push(list)
  }
}
class ListTagsForBatch {
  Rolls: AutonomousRoll[] = new Array();
}