import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Gebruiker} from "../components/gebruiker-formulier/gebruiker";
import {serverUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  uri = serverUrl + '/gebruikers';

  constructor(private http: HttpClient) {
  }

  private _gebruikersUpdated$ = new Subject<Gebruiker[]>();


  getAll(): void {
    this.http.get<Gebruiker[]>(this.uri) // get contacts from server
      .subscribe(                      // when the results arrive (some time in the future):
        gebruikers => this._gebruikersUpdated$.next(gebruikers)
      );                               // rise the contactsUpdated event and supply the contacts
  }

  add(g: Gebruiker): void {
    this.http.post<Gebruiker>(this.uri, g).subscribe( () => this.getAll());
}

  delete(g: Gebruiker): void {
    this.http.delete(`${this.uri}/${g.id}`) // delete contact from server
      .subscribe(() => this.getAll());      // when deleted: getAll (refresh)
  }

  search(value: string): void {
    this.http.get<Gebruiker[]>(`${this.uri}?q=${value}`)
      .subscribe(gebruikers => this._gebruikersUpdated$.next(gebruikers));
  }

  get gebruikersUpdated$(): Subject<Gebruiker[]> {
    return this._gebruikersUpdated$;
  }

  get(id: number): Observable<Gebruiker> {
    return this.http.get<Gebruiker>(`${this.uri}/${id}`);
  }

  update(g: Gebruiker, id: number): void {
    this.http.put<Gebruiker[]>(`${this.uri}/${id}`, g) // put contact to server
      .subscribe(() => this.getAll());  // when posted: getAll (refresh)
  }

}
