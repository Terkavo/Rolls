import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchesOfRolls, RollStatus } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';
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
  public SearchAtCounterparties: boolean = true;
  public SearchUsedUp: boolean = true;

  constructor(private header: HeaderService, public Service: ListOfRollsService,) { }
  ngOnInit(): void {
    this.header.Item = "Список рулонов"
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
  }
}
