import { Component, Input, OnInit } from '@angular/core';
import { AutonomousRoll, BatchesOfRolls, Roll } from '../../list-of-batches-of-rolls/list-of-batches-of-rolls.service';
import { ListOfRollsService } from '../list-of-rolls.service';

@Component({
  selector: 'app-roll-on-list',
  templateUrl: './roll-on-list.component.html',
  styleUrls: ['./roll-on-list.component.scss']
})
export class RollOnListComponent implements OnInit {
  @Input() Roll: AutonomousRoll;
  @Input() EvenElement: boolean

  constructor(private Service: ListOfRollsService) { }

  ngOnInit(): void {
  }
  GetLocation(): string {
    if (this.Roll.IsUsedUp)
      return "Израсходован";
    if (this.Roll.IsInWorkshop === true)
      return "В цеху";
    if (this.Roll.CounterpartyOwner !== null)
      return this.Roll.CounterpartyOwner;
    if (this.Roll.Location === null)
      return "Н/у"
    return this.Roll.Location
  }

}
