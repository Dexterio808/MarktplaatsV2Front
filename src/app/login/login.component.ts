import {Component} from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  user = {} as User;
  message$ = this.service.message$;

  constructor(private service: UserService, private router: Router) {
  }

  login(): void {
    this.service.loggedIn$.subscribe(()=>this.router.navigate(['/producten']))
    this.service.login(this.user);
    this.user = {} as User;
  }

}
