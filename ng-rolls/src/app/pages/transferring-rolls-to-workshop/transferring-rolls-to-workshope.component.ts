import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { MyDataListInputEvent } from 'src/app/html-elements/datalist/datalist-companent/datalist.component';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchesOfRolls } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-transferring-rolls-to-workshop',
  templateUrl: './transferring-rolls-to-workshop.component.html',
  styleUrls: ['./transferring-rolls-to-workshop.component.scss']
})
export class TransferringRollsToWorkshopComponent implements OnInit {
  ThrowOffEvent: Subject<void> = new Subject<void>();
  Roll: AutonomousRoll | null = null;
  Counterparties: string[]
  CounterpartyEvent: MyDataListInputEvent;
  constructor(private header: HeaderService, private http: HttpService) { }

  ngOnInit(): void {
    this.header.Item = "Перенос рулонов в цех"
    let th = this
    this.http.SendGet(`Main/GetCounterparty/Out`).subscribe({
      next(value) {
        th.Counterparties = value as string[]
      },
    })
  }
  SetRollLocation() {
    let th = this
    this.http.SendGet(`Main/TransferringRollsToWarehouse/${this.Roll!.Id}`).subscribe({
      next() {
        th.Roll = null;
        th.ThrowOffEvent.next();
      },
    })
  }
  SendToCounterparty() {
    let th = this
    this.http.SendGet(`Main/TransferringRollsToCounterparty/${this.Roll!.Id}/${this.CounterpartyEvent.Value}`).subscribe({
      next() {
        th.Roll = null;
        th.ThrowOffEvent.next();
      },
    })
  }
}
