import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@terka/my-lib';
import { table } from 'console';
import { PrintService } from 'src/app/printer/print.service';
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

  @ViewChild('body') body: ElementRef<HTMLElement>;

  IsMenuOn: boolean = false;
  MenuRoll: AutonomousRoll;
  MenuX: number = 0;
  MenuY: number = 0;

  IsPrintingRollIsUnderway = false
  constructor(private header: HeaderService, private Service: ListOfRollsService, private router: Router, private Printer: PrintService) { }
  ngOnInit(): void {
    document.oncontextmenu = function () { return false }
    this.header.SetItem("Список рулонов", () => {
      this.Service.Upload(this.SearchAtCounterparties, this.SearchUsedUp).subscribe(() => this.UpdateSerch());
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
    let fitsRoolsArr: AutonomousRoll[] = new Array();
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
        fitsRoolsArr.push(rollElement);
    };
    this.FitsRoolsArr = new Array();
    for (let index = 0; index < fitsRoolsArr.length; index++) {
      const element = fitsRoolsArr[index];
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
    this.ReCreateRealArr()
  }
  SortRolls(isNum: boolean = false) {
    if (this.SordField === null)
      return
    this.FitsRoolsArr.sort((a, b) => {
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
    this.ReCreateRealArr()
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
  onRightClick(event: MouseEvent, product: AutonomousRoll) {
    if (event.buttons !== 2) {
      this.IsMenuOn = false;
      return;
    }
    this.MenuX = event.clientX
    this.MenuY = event.clientY
    this.MenuRoll = product
    this.IsMenuOn = true;

  }
  OpenBatch() {
    this.router.navigate([`list-of-batches-of-rolls/${this.MenuRoll.OrderId}`]);
  }
  PrintRoll() {
    this.IsPrintingRollIsUnderway = true
    setTimeout(() => {
      this.Printer.Roll = this.MenuRoll
      this.Printer.print("roll")
      setTimeout(() => this.IsPrintingRollIsUnderway = false, 100)

    });
  }
  Print() {
    print()
  }
  LongClick() {
    console.log("w")
  }
  @ViewChild('table') TableElement: ElementRef<HTMLElement>;
  public RealRoolsArr: AutonomousRoll[] = new Array()

  ReCreateRealArr() {
    this.TableElement.nativeElement.scrollTop = 0;
    this.RealRoolsArr = new Array();
    for (let i = 0; i < 15; i++) {
      if (this.FitsRoolsArr[i] === undefined) return;
      this.RealRoolsArr.push(this.FitsRoolsArr[i])
    }
    setTimeout(() => this.onScrollUl())
  }

  onScrollUl() {
    let bottom = this.TableElement.nativeElement.scrollHeight
    let clientHeight = this.TableElement.nativeElement.scrollTop + 800
    if (bottom > clientHeight) return;
    if (this.FitsRoolsArr[this.RealRoolsArr.length] === undefined) return;
    this.RealRoolsArr.push(this.FitsRoolsArr[this.RealRoolsArr.length])
    setTimeout(() => this.onScrollUl())
  }
}