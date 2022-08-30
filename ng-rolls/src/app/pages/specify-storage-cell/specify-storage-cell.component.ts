import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Subject } from 'rxjs';
import { DataListOptions, MyDataListInputEvent } from 'src/app/html-elements/datalist/datalist-companent/datalist.component';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchOfRolls } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-specify-storage-cell',
  templateUrl: './specify-storage-cell.component.html',
  styleUrls: ['./specify-storage-cell.component.scss']
})
export class SpecifyStorageCellComponent implements OnInit {
  ThrowOffEvent: Subject<void> = new Subject<void>();
  Roll: AutonomousRoll | null = null;
  LocationEvent: MyDataListInputEvent;
  Locations: string[] = ["1.1", "1.2", "1.3", "2.1", "2.2", "2.3", "3.1", "3.2", "3.3", "4", "4.1", "4.2", "4.3", "5", "стеллаж",
    "на полу"];

  constructor(private header: HeaderService, private http: HttpService) { }

  ngOnInit(): void {
    this.header.SetItem("Указывание ячейки хранения рулона")
  }
  SetRollLocation() {
    let th = this
    this.http.SendGet(`Main/SetRollLocation/${this.Roll!.Id}/${this.LocationEvent.Value}`).subscribe({
      next() {
        th.Roll = null;
        th.ThrowOffEvent.next();
      },
    })
  }
  emitEventToDatalistAddPack() {
    this.ThrowOffEvent.next();
  }
}
