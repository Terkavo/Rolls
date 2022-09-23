import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent implements OnInit, OnDestroy {
  @Input() EventSetFocus: Observable<void> | undefined;
  public CorrectOptions: DataListOptions[] = new Array
  private _Optuons: DataListOptions[] = new Array;
  public get Optuons(): DataListOptions[] {
    return this._Optuons;
  }
  @Input() public set Optuons(value: DataListOptions[] | string[]) {
    if (value.length === 0)
      return;
    if (typeof value[0] === "string")
      value = DataListOptions.CreateOnValueArray(<string[]>value);
    this._Optuons = <DataListOptions[]>value;
  }

  //Output
  @Output("myInput") InputForOutput = new EventEmitter<MyDataListInputEvent>();
  //html
  private readonly html: HTMLElement = <HTMLElement>document.querySelector("html");
  @ViewChild('items') el: ElementRef<HTMLElement>;
  @ViewChild('input') Input: ElementRef<HTMLInputElement>;
  //value
  private _Value: string = "";
  @Input() set Value(value: string) {
    this._Value = value
    this.updateCorrectOptions()
    this.runFullComplianceCheck()
  }
  get Value() {
    return this._Value;
  }
  onClickHtml = (e: Event) => {
    let clickOnUl = false;
    let path = e.composedPath()
    if (e.target === this.Input.nativeElement)
      clickOnUl = true;
    path.forEach(element => {
      if (clickOnUl == true)
        return;
      let hTMLElement = element as HTMLElement
      if (hTMLElement.classList == undefined)
        return;
      hTMLElement.classList.forEach(element => {
        if (element === "datalist-ul")
          clickOnUl = true;
        if (element === "not-hide-datalist-list-on-click")
          clickOnUl = true;
      });
    });
    if (clickOnUl)
      return
    this.el.nativeElement.classList.remove("active");
    this.runFullComplianceCheck()
  }
  constructor() {
  }
  ngOnInit(): void {
    this.html.addEventListener("mousedown", this.onClickHtml)
    this.EventSetFocus?.subscribe(() => {
      this.SetFocus();
    });
    this.runFullComplianceCheck()
  }
  SetFocus() {
    this.Input.nativeElement.focus();
  }
  ngOnDestroy(): void {
    this.html.removeEventListener("click", this.onClickHtml)
  }
  onFocus() {
    this.el?.nativeElement.classList.add("active");
    this.updateCorrectOptions()
  }
  updateCorrectOptions() {
    this.CorrectOptions = new Array()
    this.Optuons.forEach(element => {
      if (element.label.toLowerCase().includes(this._Value.toLowerCase()))
        this.CorrectOptions.push(element)
      else if (element.value.toLowerCase().includes(this._Value.toLowerCase()))
        this.CorrectOptions.push(element)
    });
  }
  onClicItem(item: DataListOptions) {
    this._Value = item.value
    this.el?.nativeElement.classList.remove("active");
    this.runFullComplianceCheck()
  }
  runFullComplianceCheck() {
    let isCompliance = false;
    this.Optuons.forEach((val) => {
      if (val.value == this._Value)
        isCompliance = true
    })
    this.InputForOutput.emit(new MyDataListInputEvent(this._Value, isCompliance))
  }
}
export class DataListOptions {
  value: string = "";
  label: string = "";
  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
  static CreateOnValueArray(arr: string[]): DataListOptions[] {
    let DataListOptionsArr: DataListOptions[] = new Array();
    arr.forEach((item) => DataListOptionsArr.push(new DataListOptions(item, "")))
    return DataListOptionsArr;
  }
}
export class MyDataListInputEvent {
  constructor(public Value: string, public IsCorrect: boolean) { }
}