import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyDataListInputEvent } from 'src/app/html-elements/datalist/datalist-companent/datalist.component';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { Roll } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';
import { ICounterparties as IListOfProperties } from '../list-of-counterparties/list-of-counterparties.component';

@Component({
  selector: 'app-add-roll',
  templateUrl: './add-roll.component.html',
  styleUrls: ['./add-roll.component.scss']
})
export class AddRollComponent implements OnInit {
  QuantityRoll: number = 0;
  Rolls: Roll[] = new Array()
  DateArrival: Date = new Date();
  Name: string = "";
  Comment: string = "";

  ProviderEvent: MyDataListInputEvent;
  ColorEvent: MyDataListInputEvent;
  UnitOfMeasurementEvent: MyDataListInputEvent;
  MaterialEvent: MyDataListInputEvent;
  ListOfProperties: IListOfProperties[] = new Array();
  UnitsOfMeasurement: string[] = ["м.п", "м.кв", "кг", "шт"]
  constructor(private http: HttpService, public Header: HeaderService, private router: Router) {
  }
  ngOnInit(): void {
    this.Header.Item = "Добавить рулоны"
    let th = this
    this.http.SendGet(`Main/GetCounterparties`).subscribe({
      next(value) {
        th.ListOfProperties = value as IListOfProperties[]
      },
    })
  }
  GetListOfProperties(value: string): string[] {
    let val = this.ListOfProperties.find(x => x.Type === value)
    if (val === undefined)
      return new Array()
    return val.ListCounterparties
  }
  OnInputQuantityRoll(quantity: string): void {
    let quantityRoll = Number.parseInt(quantity);
    if (Number.isNaN(quantityRoll))
      return;
    if (quantityRoll < 0)
      return;
    if (quantityRoll > 100)
      return
    this.QuantityRoll = quantityRoll;
    this.TryChangeRolls()
  }
  OnInputData(quantity: string) {
    this.DateArrival = new Date(quantity)
    console.log(this.DateArrival);
  }
  TryChangeRolls() {
    if (this.QuantityRoll == this.Rolls.length)
      return;
    if (this.QuantityRoll > this.Rolls.length) {
      this.Rolls.push(new Roll())
      this.TryChangeRolls()
    }
    else {
      this.Rolls.pop()
      this.TryChangeRolls()
    }
  }
  Save() {
    this.Rolls.forEach(el => el.Quantity = <string>el.Quantity + this.UnitOfMeasurementEvent.Value)
    let th = this
    this.http.SendPost(`Main/SaveBatchRolls`, this).subscribe({
      next(value: any) {
        th.router.navigate([`list-of-batches-of-rolls/${value.id}`]);
      },
    })
  }
  CalculationOfRolls() {
    let res = 0
    this.Rolls.forEach(x => res += Number.parseInt(x.Quantity))
    return res
  }
   toJSON() {
    return {
      Rolls: this.Rolls,
      DateArrival: this.DateArrival,
      Provider: this.ProviderEvent.Value,
      Name: this.Name,
      Color: this.ColorEvent.Value,
      Comment: this.Comment,
      Material: this.MaterialEvent.Value,
    }
  }
}
