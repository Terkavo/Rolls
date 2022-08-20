import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  IsReadyForRendering: boolean = false
  constructor(public AuthS: AuthorizationService){}
  ngOnInit(): void {
    this.IsReadyForRendering = true;
  }
  title = 'ng-barcode';
}
