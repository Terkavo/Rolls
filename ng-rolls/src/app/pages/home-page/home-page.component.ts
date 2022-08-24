import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/html-elements/header/header.service';
import { AuthorizationService } from 'src/app/authorization/authorization.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private rout: Router, private header: HeaderService,public Auth:AuthorizationService) { }
  ngOnInit(): void {
    this.header.Item = "Главная";
    this.header.IsResetButton = false;
  }
}