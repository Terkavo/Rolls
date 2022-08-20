import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { BatchesOfRolls } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-report-that-roll-is-used-up',
  templateUrl: './report-that-roll-is-used-up.component.html',
  styleUrls: ['./report-that-roll-is-used-up.component.scss']
})
export class ReportThatRollIsUsedUpComponent implements OnInit {

  ThrowOffEvent: Subject<void> = new Subject<void>();
  Batch: BatchesOfRolls | null = null;

  constructor(private header: HeaderService, private http: HttpService) { }

  ngOnInit(): void {
    this.header.Item = "Cообщить что рулон израсходован"
  }
  SetRollLocation() {
    let th = this
    this.http.SendGet(`Main/ReportThatRollIsUsedUp/${this.Batch!.Rolls[0].Id}`).subscribe({
      next() {
        th.Batch = null;
        th.ThrowOffEvent.next();
      },
    })
  }

}
