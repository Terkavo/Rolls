import { Component, Input, OnInit } from '@angular/core';
import { AutonomousRoll, BatchOfRolls, Roll } from '../../list-of-batches-of-rolls/list-of-batches-of-rolls.service';
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

}
