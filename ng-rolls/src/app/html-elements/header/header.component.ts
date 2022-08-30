import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public service: HeaderService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let th=this
    this.route.params.subscribe(async (params: Params) => {
      th.service.SetItem("")
    })
  }
}
