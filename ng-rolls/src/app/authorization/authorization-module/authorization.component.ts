import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  Login: string = "";
  Password: string = "";
  Error: string = "";
  constructor(private http: HttpService, private auth: AuthorizationService) { 
    
  }
  ngOnInit(): void {
  }
  Enter() {
    let strim = this.http.SendPost("Authorization", { "Login": this.Login, "Password": this.Password })
    let th = this
    strim.subscribe({
      next(res: any) {
        th.auth.SetToken(res.token)
      },
      error(err: HttpErrorResponse) {
        if (err.error.errorText == "Invalid username or password.")
          th.Error = "Неверный Логин/Пароль";
        else
          th.Error = "Неизвестная ошибка"
      },
    })
  }

}
