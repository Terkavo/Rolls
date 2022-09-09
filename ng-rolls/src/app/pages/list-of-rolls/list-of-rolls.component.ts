import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchOfRolls, RollStatus } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';
import { ListOfRollsService } from './list-of-rolls.service';

@Component({
  selector: 'app-list-of-rolls',
  templateUrl: './list-of-rolls.component.html',
  styleUrls: ['./list-of-rolls.component.scss']
})
export class ListOfRollsComponent implements OnInit {
  private _Search: string = "";
  public FitsRoolsArr: AutonomousRoll[]
  public get Search(): string {
    return this._Search;
  }
  public set Search(value: string) {
    this._Search = value;
  }
  public SerchNotSpecified: boolean = true;
  public SearchInWarehouse: boolean = true;
  public SearchInWorkshop: boolean = true;
  public SearchAtCounterparties: boolean = false;
  public SearchUsedUp: boolean = false;

  private IsLoadedAtCounterparties = false;
  private IsLoadedUsedUp = false;

  private SordField: string = "Id";
  private SortUp: boolean = true

  constructor(private header: HeaderService, private Service: ListOfRollsService,) { }
  ngOnInit(): void {
    this.header.SetItem("Список рулонов", () => {
      this.Service.Upload(this.SearchAtCounterparties, this.SearchUsedUp).subscribe();
      if (!this.SearchAtCounterparties)
        this.IsLoadedAtCounterparties = false;
      if (!this.SearchUsedUp)
        this.IsLoadedUsedUp = false;
    })
    let th = this
    this.Service.Upload().subscribe({
      next() {
        th.UpdateSerch()
      },
    })
  }
  UpdateSerch() {
    let valuesArr = this._Search.trim().split(" ");
    let rollsArr = this.Service.GetRolls()
    let FitsRoolsArr: AutonomousRoll[] = new Array();
    for (let rollsIndex = 0; rollsIndex < rollsArr.length; rollsIndex++) {
      const rollElement = rollsArr[rollsIndex];
      let roolFits = true;
      let NotNecessaryField = rollElement.DateOfCreation;
      let stringsArr = Object.values(rollElement);
      stringsArr = stringsArr.filter(x => typeof x === "string")
      stringsArr = stringsArr.filter(x => x !== NotNecessaryField)

      for (let index = 0; index < valuesArr.length; index++) {
        const valueElement = valuesArr[index];
        let valueСonfirmed = false

        for (let index = 0; index < stringsArr.length; index++) {
          const stringElement = stringsArr[index];
          if (stringElement.toLowerCase().indexOf(valueElement.toLowerCase()) !== -1) {
            valueСonfirmed = true
            break
          }
        }
        if (!valueСonfirmed) {
          roolFits = false
          break
        }
      }
      if (roolFits)
        FitsRoolsArr.push(rollElement);
    };
    this.FitsRoolsArr = new Array();
    for (let index = 0; index < FitsRoolsArr.length; index++) {
      const element = FitsRoolsArr[index];
      if (element.Status() === RollStatus.NOT_SPECIFIED) {
        if (this.SerchNotSpecified)
          this.FitsRoolsArr.push(element)
      }
      else if (element.Status() === RollStatus.IN_WAREHOUSE) {
        if (this.SearchInWarehouse)
          this.FitsRoolsArr.push(element)
      }
      else if (element.Status() === RollStatus.IN_WORKSHOP) {
        if (this.SearchInWorkshop)
          this.FitsRoolsArr.push(element)
      }
      else if (element.Status() === RollStatus.AT_COUNTERPARTIES) {
        if (this.SearchAtCounterparties)
          this.FitsRoolsArr.push(element)
      }
      else if (element.Status() === RollStatus.IS_USED_UP) {
        if (this.SearchUsedUp)
          this.FitsRoolsArr.push(element)
      }
    }
    this.SortRolls(true)
  }
  SortRolls(isNum: boolean = false) {
    if (this.SordField === null)
      return
    this.FitsRoolsArr.sort((a, b) => {
      //debugger
      let anyA: any = a as any;
      let anyB: any = b as any;
      let str = <string>anyA[<string>this.SordField]
      let multiplier = 1
      if (this.SortUp)
        multiplier = -1
      if (isNum) {
        let num1 = (Number.parseFloat(str.replace(/[^.\d]/g, '')));
        let num2 = Number.parseFloat(<string>anyB[<string>this.SordField].replace(/[^.\d]/g, ''))
        if (Number.isNaN(num2))
          return -1 * multiplier
        if (Number.isNaN(num1))
          return 1 * multiplier
        if (num1 === num2)
          return 0
        return (num1 - num2) * multiplier
      }
      return str.localeCompare(<string>anyB[<string>this.SordField]) * multiplier;
    });
  }
  SetSordField(val: string) {
    if (val === this.SordField)
      this.SortUp = !this.SortUp
    else {
      this.SordField = val
      this.SortUp = false
    }
    if (val === "Id" || val === "Location" || val === "Quantity")
      this.SortRolls(true)
    else
      this.SortRolls()
  }
  TryAdditionalLoading(val: string) {
    if (val === "AtCounterparties") {
      if (this.IsLoadedAtCounterparties)
        return
    }
    else if (val === "UsedUp")
      if (this.IsLoadedUsedUp)
        return
    this.Service.UploadAtCounterparties(val).subscribe(() => {
      this.UpdateSerch();
    })
    if (val === "AtCounterparties")
      this.IsLoadedAtCounterparties = true
    else if (val === "UsedUp")
      this.IsLoadedUsedUp = true

  }
}