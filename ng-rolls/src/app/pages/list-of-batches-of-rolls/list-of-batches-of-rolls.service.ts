import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListOfBatchesOfRollsService {

  Batches: BatchesOfRolls[] = new Array
  private IsRequestExecuting: boolean = false
  private ObservableRequest: Observable<Object>
  constructor(private http: HttpService,) { }
  async Update() {
    return new Promise<void>(resolve => {
      let th = this
      this.http.SendGet("Main/GetBatchesOfRolls").subscribe({
        next(value: any) {
          let batches = plainToInstance(BatchesOfRolls, value as Array<any>)
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
  async GetOnId(id: string): Promise<BatchesOfRolls> {
    let th = this
    return new Promise<BatchesOfRolls>((resolve, reject) => {
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
  private GetOnIdSync(id: string): BatchesOfRolls {
    let result = this.Batches.find(x => x.Id === id)
    if (result === undefined)
      throw new Error();
    return result
  }
}
export class BatchesOfRolls {
  Id: string;
  DateArrival: string;
  DateOfCreation: string;
  Rolls: Roll[];

  //info
  Provider: string;
  Name: string;
  Color: string;
  Material: string;
  Comment: string;
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
}
export class Roll {
  Id: string;
  Quantity: string;
  Location: string | null = null;
  CounterpartyOwner: string | null = null;
  IsInWorkshop: boolean = false
  IsUsedUp: boolean | null = null

  constructor(quantity: string = "") {
    this.Quantity = quantity
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
  Location: string | null = null;
  CounterpartyOwner: string | null;
  IsInWorkshop: boolean;
  IsUsedUp: boolean | null = null

  DateArrival: string
  DateOfCreation: string
  Provider: string
  Name: string
  Color: string
  Comment: string
  Material: string;
  constructor(batches: BatchesOfRolls, roll: Roll) {
    this.Id = roll.Id
    this.Quantity = roll.Quantity
    this.Location = roll.Location
    this.IsUsedUp = roll.IsUsedUp
    this.CounterpartyOwner = roll.CounterpartyOwner
    this.IsInWorkshop = roll.IsInWorkshop

    this.DateArrival = batches.DateArrival
    this.DateOfCreation = batches.DateOfCreation
    this.Provider = batches.Provider
    this.Name = batches.Name
    this.Color = batches.Color
    this.Comment = batches.Comment
    this.Material = batches.Material
  }

  Status(): RollStatus {
    if (this.IsUsedUp)
      return RollStatus.IS_USED_UP;
    if (this.IsInWorkshop === true)
      return RollStatus.IN_WORKSHOP;
    if (this.CounterpartyOwner !== null)
      return RollStatus.AT_COUNTERPARTIES;
    if (this.Location === null)
      return RollStatus.NOT_SPECIFIED;
    return RollStatus.IN_WAREHOUSE
  }
}
export enum RollStatus { NOT_SPECIFIED, IN_WAREHOUSE, IN_WORKSHOP, AT_COUNTERPARTIES, IS_USED_UP };