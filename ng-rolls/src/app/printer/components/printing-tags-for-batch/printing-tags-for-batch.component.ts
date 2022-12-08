import { Component, OnInit } from '@angular/core';
import { AutonomousRoll, BatchOfRolls, Roll } from 'src/app/pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';
import { PrintService } from '../../print.service';

@Component({
  selector: 'app-printing-tags-for-batch',
  templateUrl: './printing-tags-for-batch.component.html',
  styleUrls: ['./printing-tags-for-batch.component.scss']
})
export class PrintingTagsForBatchComponent implements OnInit {
  constructor(public Service: PrintService) { }
  Rolls: AutonomousRoll[] = new Array()
  ngOnInit(): void {
    this.Service.Batches.forEach(x => {
      this.Rolls.PushArray(x.GetAutonomousRoll())
    })
  }
}