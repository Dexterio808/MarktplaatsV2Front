import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {serverUrl} from '../../environments/environment';
import {User} from '../models/User';

@Injectable({providedIn: 'root'}) // ApplicationScoped
export class UserService {

  private uri = serverUrl + '/login';
  loggedInUser: User | null;

  loggedIn$ = new Subject<string>();
  loggedOut$ = new Subject<string>();

  message$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  login(u: User): void {
    this.http.post<User>(`${this.uri}`, u, {observe: 'response'} /* = to receive the full httpresponse instead of only the body */)
      .subscribe(
        data => {
          // get the body from the response:
          this.loggedInUser = data.body;

          this.loggedIn$.next(this.loggedInUser.email);
          this.message$.next(`Gebruiker ${this.loggedInUser.email} is ingelogd.`);
          localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

          // or get a header from the response:
          const token = data.headers.get('Authorization')?.substr(7);
          localStorage.setItem('token', JSON.stringify(token));
        },
        error => {
          console.log(error);
          this.message$.next(`Inloggen is mislukt.  Reden: ${error.statusText}.`);
        }
      );
  }

  logout(): void {
    this.loggedInUser = null;
    //this.loggedOut$.next();
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}

