import {Component} from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  user = {} as User;
  message$ = this.service.message$;

  constructor(private service: UserService) {
  }

  login(): void {
    this.service.login(this.user);
    this.user = {} as User;
  }

}
