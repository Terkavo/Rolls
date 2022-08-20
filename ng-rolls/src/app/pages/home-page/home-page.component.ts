import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataListOptions } from 'src/app/html-elements/datalist/datalist-companent/datalist.component';
import { Subject } from 'rxjs';
import { HeaderService } from 'src/app/html-elements/header/header.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private rout: Router, private header: HeaderService) { }
  ngOnInit(): void {
    this.header.Item = "Главная";
    this.header.IsResetButton = false;
  }
}