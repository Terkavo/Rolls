import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@terka/my-lib';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchOfRolls } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-report-that-roll-is-used-up',
  templateUrl: './report-that-roll-is-used-up.component.html',
  styleUrls: ['./report-that-roll-is-used-up.component.scss']
})
export class ReportThatRollIsUsedUpComponent implements OnInit {

  ThrowOffEvent: Subject<void> = new Subject<void>();
  Roll: AutonomousRoll | null = null;

  constructor(private header: HeaderService, private http: HttpService) { }

  ngOnInit(): void {
    this.header.SetItem("Cообщить что рулон израсходован")
  }
  SetRollLocation() {
    let th = this
    this.http.SendGet(`Rolls/SetUsedUpTrue/${this.Roll!.Id}`).subscribe({
      next() {
        th.Roll = null;
        th.ThrowOffEvent.next();
      },
    })
  }

}
