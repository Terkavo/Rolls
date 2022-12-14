import { Component, OnInit } from '@angular/core';
import { HeaderService, MyDataListInputEvent } from '@terka/my-lib';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Component({
  selector: 'app-change-roll-quantity',
  templateUrl: './change-roll-quantity.component.html',
  styleUrls: ['./change-roll-quantity.component.scss']
})
export class ChangeRollQuantityComponent implements OnInit {
  ThrowOffEvent: Subject<void> = new Subject<void>();
  Roll: AutonomousRoll | null = null;
  Value: number;
  UnitOfMeasurement: string = ""

  UnitOfMeasurementEvent: MyDataListInputEvent;
  UnitsOfMeasurement: string[] = ["м.п", "м.кв", "кг", "шт"]

  constructor(private header: HeaderService, private http: HttpService) { }

  ngOnInit(): void {
    this.header.SetItem("Изменить \"Количество в упаковке\" рулона")
  }
  UpdateRoll(roll: AutonomousRoll): void {
    this.Value = Number.parseFloat(roll.Quantity.replace(/[^.\d]/g, ''))
    this.UnitOfMeasurement = roll.Quantity.replace(/[0-9]/g, '')
    if (this.UnitOfMeasurement[0] === ".")
      this.UnitOfMeasurement = this.UnitOfMeasurement.substring(1, this.Value.toString().length)
    this.Roll = roll;
  }
  Send() {
    let th = this
    let FillQuantity = this.Value + this.UnitOfMeasurementEvent.Value
    this.http.SendGet(`Rolls/SetQuantity/${this.Roll!.Id}/${FillQuantity}`).subscribe({
      next() {
        th.Roll = null;
        th.ThrowOffEvent.next();
      },
    })
  }

}
