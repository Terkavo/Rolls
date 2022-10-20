import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { HeaderService, MyDataListInputEvent } from '@terka/my-lib';

import { HttpService } from 'src/app/http/http.service';
import { BatchOfRolls, Roll } from 'src/app/pages/list-of-batches-of-rolls/list-of-batches-of-rolls.service';
import { ICounterparties } from 'src/app/pages/list-of-counterparties/list-of-counterparties.component';

@Component({
  selector: 'app-editing-bath',
  templateUrl: './editing-bath.component.html',
  styleUrls: ['./editing-bath.component.scss']
})
export class EditingBathComponent implements OnInit {

  private _QuantityRoll: number = 1;
  public get QuantityRoll(): number {
    return this._QuantityRoll;
  }
  public set QuantityRoll(value: number) {
    this.TryChangeRolls()
    this._QuantityRoll = value;
  }

  ProviderEvent: MyDataListInputEvent;
  ColorEvent: MyDataListInputEvent;
  UnitOfMeasurementEvent: MyDataListInputEvent;
  MaterialEvent: MyDataListInputEvent;
  ListOfProperties: ICounterparties[] = new Array();
  UnitsOfMeasurement: string[] = ["м.п", "м.кв", "кг", "шт"]

  @Input() IsChanges: boolean = false
  @Input("Batch") InputBatch: BatchOfRolls;

  @Output("save") SaveOutput = new EventEmitter<BatchOfRolls>();
  constructor(private http: HttpService, public Header: HeaderService, private router: Router) {
  }
  ngOnInit(): void {
    let th = this
    this.http.SendGet(`Main/GetCounterparties`).subscribe({
      next(value) {
        th.ListOfProperties = value as ICounterparties[]
      },
    })
    if (this.IsChanges)
      this._Date = Date.FromDDMMYYYY(this.InputBatch.DateArrival)
    this.TryChangeRolls()
  }
  GetListOfProperties(value: string): string[] {
    let val = this.ListOfProperties.find(x => x.Type === value)
    if (val === undefined)
      return new Array()
    return val.ListCounterparties
  }

  TryChangeRolls() {
    if (this.QuantityRoll == this.InputBatch.Rolls.length)
      return;
    if (this.QuantityRoll > this.InputBatch.Rolls.length) {
      this.InputBatch.Rolls.push(new Roll())
      this.TryChangeRolls()
    }
    else {
      this.InputBatch.Rolls.pop()
      this.TryChangeRolls()
    }
  }
  Save() {
    this.InputBatch.Provider = this.ProviderEvent.Value
    this.InputBatch.Color = this.ColorEvent.Value
    this.InputBatch.Material = this.MaterialEvent.Value
    if (!this.IsChanges)
      this.InputBatch.Rolls.forEach(el => el.Quantity = <string>el.Quantity + this.UnitOfMeasurementEvent.Value)
    this.SaveOutput.emit(this.InputBatch)
  }
  CalculationOfRolls() {
    let res = 0
    this.InputBatch.Rolls.forEach(x => res += Number.parseFloat(x.Quantity))
    return res
  }
  ButtonDisabled(): boolean {
    if (!this.ColorEvent.IsCorrect || !this.ProviderEvent.IsCorrect || !this.MaterialEvent.IsCorrect || this.InputBatch.DateArrival === "")
      return true
    if (!this.IsChanges)
      return !this.UnitOfMeasurementEvent.IsCorrect || this.InputBatch.Rolls.length === 0
    return false
  }
  private _Date: Date
  public get Date() {
    return this._Date
  }
  public set Date(value:any) {
    this._Date = value._d;
    try {
      this.InputBatch.DateArrival = value._d.FormatDDMMYYYY()
    } catch { }
  }
}