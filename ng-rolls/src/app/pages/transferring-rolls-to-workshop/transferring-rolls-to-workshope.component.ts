import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { BatchesOfRolls } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-transferring-rolls-to-workshop',
  templateUrl: './transferring-rolls-to-workshop.component.html',
  styleUrls: ['./transferring-rolls-to-workshop.component.scss']
})
export class TransferringRollsToWorkshopComponent implements OnInit {
  ThrowOffEvent: Subject<void> = new Subject<void>();
  Batch: BatchesOfRolls | null = null;
  RecipientsName: string = "";
  constructor(private header: HeaderService, private http: HttpService) { }

  ngOnInit(): void {
    this.header.Item = "Перенос рулонов в цех"
  }
  SetRollLocation() {
    let th = this
    this.http.SendGet(`Main/TransferringRollsToWarehouse/${this.Batch!.Rolls[0].Id}`).subscribe({
      next() {
        th.Batch = null;
        th.ThrowOffEvent.next();
      },
    })
  }
  SendToOtherPeople(){
    let th = this
    this.http.SendGet(`Main/TransferringRollsToOtherPeople/${this.Batch!.Rolls[0].Id}/${this.RecipientsName}`).subscribe({
      next() {
        th.Batch = null;
        th.ThrowOffEvent.next();
      },
    })
  }
}
