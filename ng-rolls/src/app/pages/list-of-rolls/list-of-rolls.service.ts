import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http/http.service';
import { AutonomousRoll, BatchesOfRolls, Roll } from '../list-of-batches-of-rolls/list-of-batches-of-rolls.service';

@Injectable({
  providedIn: 'root'
})
export class ListOfRollsService {
  Batches: BatchesOfRolls[] = new Array();
  constructor(private http: HttpService) { }
  Upload(): Observable<void> {
    let th = this
    return new Observable(observer => {
      this.http.SendGet("Main/GetBatchesOfRolls").subscribe({
        next(value) {
          let batches = plainToInstance(BatchesOfRolls, value as Array<any>)
          batches.forEach(element => {
            element.ToClass();
          });
          th.Batches = batches;
          observer.next()
        },
      })
    })
  }
  GetRolls(): AutonomousRoll[] {
    let arr: AutonomousRoll[] = new Array();
    this.Batches.forEach(element => {
      arr = arr.concat(element.GetAutonomousRoll());
    });
    return arr;
  }
  FindBatchOnRollsId(id: string): BatchesOfRolls {
    let ret = this.Batches.find(x => x.Rolls.find(y => y.Id === id) !== undefined)
    if (ret === undefined)
      throw new Error();
    return ret;
  }
}
