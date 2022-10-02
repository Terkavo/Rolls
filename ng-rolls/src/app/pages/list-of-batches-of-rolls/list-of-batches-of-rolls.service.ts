import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListOfBatchesOfRollsService {

  Batches: BatchOfRolls[] = new Array
  private IsRequestExecuting: boolean = false
  private ObservableRequest: Observable<Object>
  constructor(private http: HttpService,) { }
  async Update() {
    return new Promise<void>(resolve => {
      let th = this
      this.http.SendGet("Main/GetBatchesOfRolls").subscribe({
        next(value: any) {
          let batches = plainToInstance(BatchOfRolls, value as Array<any>)
          batches.forEach(element => {
            element.ToClass();
          });
          th.Batches = batches;
          th.IsRequestExecuting = false;
          resolve();
        },
      })
      this.IsRequestExecuting = true
    })
  }
  async GetOnId(id: string): Promise<BatchOfRolls> {
    let th = this
    return new Promise<BatchOfRolls>((resolve, reject) => {
      if (this.IsRequestExecuting)
        this.ObservableRequest.subscribe({
          complete() {
            setTimeout(() => {
              try {
                resolve(th.GetOnIdSync(id));
              } catch {
                reject();
              }
            }, 10)
          },
        })
      try {
        resolve(th.GetOnIdSync(id));
      } catch {
        reject();
      }
    })
  }
  private GetOnIdSync(id: string): BatchOfRolls {
    let result = this.Batches.find(x => x.Id === id)
    if (result === undefined)
      throw new Error();
    return result
  }
}
export class BatchOfRolls {
  Id: string;
  DateArrival: string = "";
  DateOfCreation: string = "";
  Rolls: Roll[] = new Array;

  //info
  Provider: string = "";
  Color: string = "";
  Material: string = "";
  Comment: string = "";
  ToClass() {
    this.Rolls = plainToInstance(Roll, this.Rolls)
  }
  GetAutonomousRoll(): AutonomousRoll[] {
    let arr: Array<AutonomousRoll> = new Array()
    this.Rolls.forEach(element => {
      arr.push(new AutonomousRoll(this, element))
    });
    return arr;
  }
  GetDateArrivalToInput() {
    let arr = this.DateArrival.split(".")
    return `${arr[2]}-${arr[1]}-${arr[0]}`
  }
}
export class Roll {
  Id: string;
  Quantity: string;
  CellInWarehouse: string | null = null;
  CounterpartyOwner: string | null = null;
  IsInWorkshop: boolean = false
  IsUsedUp: boolean | null = null
  InTheWorkshopWith: string
  constructor() {
  }
  toJSON() {
    return {
      Quantity: this.Quantity,
    }
  }
}

export class AutonomousRoll {
  Id: string;
  Quantity: string;
  CellInWarehouse: string | null = null;
  CounterpartyOwner: string | null;
  IsInWorkshop: boolean;
  IsUsedUp: boolean | null = null

  OrderId: string
  DateArrival: string
  DateOfCreation: string
  Provider: string
  Color: string
  Comment: string
  Material: string;

  InTheWorkshopWith: string
  constructor(batches: BatchOfRolls, roll: Roll) {
    this.Id = roll.Id
    this.Quantity = roll.Quantity
    this.CellInWarehouse = roll.CellInWarehouse
    this.IsUsedUp = roll.IsUsedUp
    this.CounterpartyOwner = roll.CounterpartyOwner
    this.IsInWorkshop = roll.IsInWorkshop
    this.InTheWorkshopWith = roll.InTheWorkshopWith;

    this.OrderId = batches.Id
    this.DateArrival = batches.DateArrival
    this.DateOfCreation = batches.DateOfCreation
    this.Provider = batches.Provider
    this.Color = batches.Color
    this.Comment = batches.Comment
    this.Material = batches.Material
  }
  get Location(): string {
    if (this.IsUsedUp)
      return "Израсходован";
    if (this.IsInWorkshop === true)
      return "В цеху";
    if (this.CounterpartyOwner !== null)
      return this.CounterpartyOwner;
    if (this.CellInWarehouse === null)
      return "Н/у"
    return this.CellInWarehouse
  }

  Status(): RollStatus {
    if (this.IsUsedUp)
      return RollStatus.IS_USED_UP;
    if (this.IsInWorkshop === true)
      return RollStatus.IN_WORKSHOP;
    if (this.CounterpartyOwner !== null)
      return RollStatus.AT_COUNTERPARTIES;
    if (this.CellInWarehouse === null)
      return RollStatus.NOT_SPECIFIED;
    return RollStatus.IN_WAREHOUSE
  }
}
export enum RollStatus { NOT_SPECIFIED, IN_WAREHOUSE, IN_WORKSHOP, AT_COUNTERPARTIES, IS_USED_UP };